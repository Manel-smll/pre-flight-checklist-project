import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components'; 

const ChecklistPage = ({ checklists, setChecklists }) => {
  const { id } = useParams(); // Récupère l'ID de la checklist
  const navigate = useNavigate();
  const [checklist, setChecklist] = useState(null); // État pour stocker la checklist trouvée
  const [modifiedChecklist, setModifiedChecklist] = useState(null); // État pour stocker les modifications

  // On cherche la checklist avec l'ID passé dans l'URL
  useEffect(() => {
    const foundChecklist = checklists.find((item) => item.id === parseInt(id, 10));
    setChecklist(foundChecklist);
    setModifiedChecklist(foundChecklist); // Initialiser les modifications avec la checklist trouvée
  }, [id, checklists]); // Cette fonction sera appelée chaque fois que l'ID ou les checklists changent

  // Gérer le changement de statut des tâches (fait/non fait)
  const handleTaskCompletion = (taskId) => {
    const updatedTasks = modifiedChecklist.tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task 
    );

    const updatedChecklist = {
      ...modifiedChecklist,
      tasks: updatedTasks,
    };

    // Mettre à jour la checklist modifiée
    setModifiedChecklist(updatedChecklist);
    updateChecklistStatus(updatedTasks); // Recalculer le statut et la progression à chaque modification
  };

  // Calculer le statut de la checklist en fonction des tâches
  const updateChecklistStatus = (tasks) => {
    const completedTasks = tasks.filter((task) => task.completed).length;
    const totalTasks = tasks.length;
    let status = 'pending';

    if (completedTasks === totalTasks) {
      status = 'completed';
    } else if (completedTasks > 0) {
      status = 'in progress';
    }

    const progress = `${completedTasks}/${totalTasks}`;

    // Mettre à jour le statut et la progression
    setModifiedChecklist((prevChecklist) => ({
      ...prevChecklist,
      status,
      progress,
    }));
  };

  // Sauvegarder les modifications de la checklist
  const handleSaveChanges = () => {
    const updatedChecklist = {
      ...modifiedChecklist,
    };

    // Mettre à jour la checklist dans la liste des checklists
    setChecklists((prevChecklists) =>
      prevChecklists.map((checklist) =>
        checklist.id === updatedChecklist.id ? updatedChecklist : checklist
      )
    );

    // Naviguer vers le Dashboard après l'enregistrement
    navigate('/dashboard');
  };

  // Si la checklist n'est pas trouvée, on affiche un message d'erreur
  if (!checklist) {
    return <div>Checklist not found</div>;
  }

  return (
    <ChecklistPageContainer>
      <PageTitle>My Checklist</PageTitle> 
      
      <InformationSection>
        <Label>Title:</Label>
        <p>{checklist.title}</p>
      </InformationSection>

      <InformationSection>
        <Label>Description:</Label>
        <p>{checklist.description}</p>
      </InformationSection>

      <StatusContainer>
        <InformationSection>
          <Label>Status:</Label>
          <StatusLabel status={modifiedChecklist.status}>
            {modifiedChecklist.status}
          </StatusLabel>
        </InformationSection>

        <InformationSection>
          <Label>Progress:</Label>
          <StatusLabel>{modifiedChecklist.progress}</StatusLabel>
        </InformationSection>
      </StatusContainer>

      <TaskList>
        {modifiedChecklist.tasks.map((task) => (
          <TaskItem key={task.id}>
            <label>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleTaskCompletion(task.id)} // Modifier le statut de la tâche
              />
              <TaskTitle>{task.taskTitle}:</TaskTitle> {task.taskDescription}
            </label>
          </TaskItem>
        ))}
      </TaskList>

      <ButtonContainer>
        <SaveButton onClick={handleSaveChanges}>Save Changes</SaveButton>
        <BackButton onClick={() => navigate('/dashboard')}>Back to Dashboard</BackButton>
      </ButtonContainer>
    </ChecklistPageContainer>
  );
};

export default ChecklistPage;

// Styled-components pour la page
const ChecklistPageContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  min-height: 600px; 
`;

const PageTitle = styled.h1`
  font-size: 32px;
  text-align: center;
  color: #26547C; 
  margin-bottom: 20px;
`;

const InformationSection = styled.div`
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-top: 15px;
  background-color: #ffffff;
`;

const Label = styled.span`
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
`;

const StatusContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const StatusLabel = styled.span`
  font-weight: bold;
  color: ${(props) =>
    props.status === 'completed'
      ? '#26547C'
      : props.status === 'in progress'
      ? '#f4c542'
      : '#ef476f'};
`;

const TaskList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-top: 20px;
`;

const TaskItem = styled.li`
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin: 5px 0;
  display: flex;
  align-items: center;

  label {
    display: flex;
    align-items: center;
  }
`;

const TaskTitle = styled.span`
  font-weight: bold;
  margin-right: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column; 
  align-items: flex-end; 
  margin-top: 20px;
`;

const SaveButton = styled.button`
  background-color: #ffd166;
  color: #000;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  width: 200px; 

  &:hover {
    background-color: #f4c542;
  }
`;

const BackButton = styled.button`
  background-color: #ef476f;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  width: 200px; 
  margin-top: 10px;

  &:hover {
    background-color: #d73757;
  }
`;

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


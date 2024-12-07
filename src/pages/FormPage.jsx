import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

const FormPage = ({ checklists, setChecklists }) => {
  const navigate = useNavigate();
  const { id } = useParams(); // Récupèrer l'ID de la checklist à éditer
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (id) {
      const checklistToEdit = checklists.find((checklist) => checklist.id === parseInt(id, 10));
      if (checklistToEdit) {
        setTitle(checklistToEdit.title);
        setDescription(checklistToEdit.description);
        setTasks(checklistToEdit.tasks);
      }
    }
  }, [id, checklists]);

  const handleAddTask = () => {
    setTasks([
      ...tasks,
      { id: Date.now(), taskTitle: '', taskDescription: '', completed: false }, // Ajout de la propriété 'completed'
    ]);
  };

  const handleTaskTitleChange = (taskId, newTitle) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, taskTitle: newTitle } : task
    );
    setTasks(updatedTasks);
  };

  const handleTaskDescriptionChange = (taskId, newDescription) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, taskDescription: newDescription } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedChecklist = {
      id: id ? parseInt(id, 10) : Date.now(), // Si un ID existe, on met à jour l'élément existant
      title,
      description,
      tasks,
    };

    if (id) {
      // Si l'ID est présent, on met à jour la checklist existante
      setChecklists(
        checklists.map((checklist) =>
          checklist.id === parseInt(id, 10) ? updatedChecklist : checklist
        )
      );
    } else {
      // Sinon, on ajoute une nouvelle checklist
      setChecklists([...checklists, updatedChecklist]);
    }

    navigate('/'); // Rediriger vers le tableau de bord
  };

  return (
    <FormContainer>
      <h2>{id ? 'Edit Checklist' : 'Create a New Checklist'}</h2>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter checklist title"
          required
        />

        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter checklist description"
          required
        />

        <h3>Add Tasks</h3>
        {tasks.map((task) => (
          <TaskInputSection key={task.id}>
            <div>
              <label>Task Title</label>
              <input
                type="text"
                value={task.taskTitle}
                onChange={(e) => handleTaskTitleChange(task.id, e.target.value)}
                placeholder="Task title"
              />
            </div>

            <div>
              <label>Task Description</label>
              <input
                type="text"
                value={task.taskDescription}
                onChange={(e) =>
                  handleTaskDescriptionChange(task.id, e.target.value)
                }
                placeholder="Task description"
              />
            </div>

            <DeleteButton onClick={() => handleDeleteTask(task.id)}>
              Delete Task
            </DeleteButton>
          </TaskInputSection>
        ))}

        <AddTaskButton type="button" onClick={handleAddTask}>
          Add Task
        </AddTaskButton>

        <SaveButton type="submit">Save Checklist</SaveButton>
      </form>
    </FormContainer>
  );
};

export default FormPage;

const FormContainer = styled.div`
  padding: 10px;
  max-width: 1000px;
  margin: 0 auto;

  h2 {
    text-align: center;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  label {
    font-weight: bold;
  }

  input {
    padding: 10px;
    margin: 5px 0;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
`;

const TaskInputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
  background-color: #f9f9f9;
`;

const AddTaskButton = styled.button`
  background-color: #ffd166; 
  color: black;
  padding: 8px 15px;
  border-radius: 5px;
  font-size: 14px;
  border: none; 

  &:hover {
    background-color: #f4c542;
  }
`;

const DeleteButton = styled.button`
  background-color: #EF476F; 
  color: black;  
  padding: 6px 8px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 12px;
  border: none; 

  &:hover {
    background-color: #d9405e;
  }
`;

const SaveButton = styled.button`
  background-color: #ffd166; /* Jaune/or */
  color: black;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  border: none;  /* Retirer la bordure par défaut */

  &:hover {
    background-color: #f4c542;
  }
`;

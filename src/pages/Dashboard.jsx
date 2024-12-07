import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Card from '../Components/Card';

const Dashboard = ({ checklists, setChecklists }) => {
  const navigate = useNavigate();

  // Fonction pour supprimer la checklist
  const handleDeleteChecklist = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this checklist?');
    if (confirmDelete) {
      setChecklists(checklists.filter(checklist => checklist.id !== id)); // Filtre les checklists en supprimant celle correspondante
    }
  };

  const handleAddChecklist = () => {
    navigate('/form');
  };

  return (
    <DashboardContainer>
      <AddButton onClick={handleAddChecklist}>+ Add New Checklist</AddButton>
      <ChecklistContainer>
        {checklists.map((checklist) => (
          <Card
            key={checklist.id}
            title={checklist.title}
            description={checklist.description}
            status={checklist.status}  // Assurer que le status est passé ici
            progress={checklist.progress}  // Assurer que le progress est passé ici
            onView={() => navigate(`/checklist/${checklist.id}`)}
            onEdit={() => navigate(`/form/${checklist.id}`)} // Ajouter la navigation vers le formulaire d'édition
            onDelete={() => handleDeleteChecklist(checklist.id)} // Passer la fonction de suppression
          />
        ))}
      </ChecklistContainer>
    </DashboardContainer>
  );
};

export default Dashboard;

const DashboardContainer = styled.div`
  padding: 20px;
`;

const AddButton = styled.button`
  display: block;
  margin: 10px auto;
  padding: 10px 20px;
  background-color: #ffd166;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #f4c542;
  }
`;

const ChecklistContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

import React from 'react';
import styled from 'styled-components';

const Card = ({ title, description, status, progress, onEdit, onDelete, onView }) => (
  <CardContainer>
    <CardTitle><strong>Title:</strong> {title}</CardTitle>
    <CardDescription><strong>Description:</strong> {description}</CardDescription>
    <CardStatus ><strong>Status:</strong> {status}</CardStatus>
    <CardProgress><strong>Progress:</strong> {progress}</CardProgress>
    <ButtonGroup>
      <EditButton onClick={onEdit}>Edit</EditButton>
      <DeleteButton onClick={onDelete}>Delete</DeleteButton>
      <ViewButton onClick={onView}>View</ViewButton>
    </ButtonGroup>
  </CardContainer>
);

export default Card;

const CardContainer = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  width: 300px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CardTitle = styled.h2`
  font-size: 18px;
  color: #26547c;
`;

const CardDescription = styled.p`
  font-size: 14px;
  color: #333;
`;

const CardStatus = styled.span`
  display: inline-block;
  margin: 5px 0;
  padding: 5px 10px;
  border-radius: 3px;
  background-color: ${(props) =>
    props.status === 'completed' ? '#26547C' :
    props.status === 'in progress' ? '#FFD166' :
    '#26547c'};
  color: ${(props) => (props.status === 'completed' ? '#fff' : '#000')};
  font-size: 14px;
`;

const CardProgress = styled.p`
  font-size: 14px;
  margin: 5px 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const EditButton = styled.button`
  background-color: #26547c;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #1e3d63;
  }
`;

const DeleteButton = styled.button`
  background-color: #ef476f;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #d9405e;
  }
`;

const ViewButton = styled.button`
  background-color: #ffd166;
  color: #000;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #f4c542;
  }
`;

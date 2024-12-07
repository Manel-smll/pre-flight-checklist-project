import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import FormPage from './pages/FormPage';
import ChecklistPage from './pages/ChecklistPage';
import Header from './Components/Header';

const App = () => {
  const [checklists, setChecklists] = useState([]); // État global des checklists

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Dashboard checklists={checklists} setChecklists={setChecklists} />}
        />
        <Route
          path="/form/:id"
          element={<FormPage checklists={checklists} setChecklists={setChecklists} />}
        />
        <Route
          path="/form"
          element={<FormPage checklists={checklists} setChecklists={setChecklists} />}
        />
        <Route
          path="/checklist/:id"
          element={<ChecklistPage checklists={checklists} />}
        />
      </Routes>
    </>
  );
};

export default App;

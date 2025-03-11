// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './components/pages/Home';
import Results from './components/pages/Results';
import FilesList from './components/pages/FilesList';
import ResultsTable from './components/common/ResultsTable';
import NotFound from './components/pages/NotFound';

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
        <Route path="/results" element={<ResultsTable />} />
        <Route path="/files" element={<FilesList />} />
        <Route path="*" element={<NotFound />} />

      </Routes>
    </Layout>
  );
}
import React from 'react';
import Sidebar from '../component/Sidebar/Sidebar';
import Dashboard from '../component/Dashboard/Dashboard';

const DoctorPortal: React.FC = () => {
  return (
    <>
      <Sidebar />
      <Dashboard />
    </>
  );
};

export default DoctorPortal;

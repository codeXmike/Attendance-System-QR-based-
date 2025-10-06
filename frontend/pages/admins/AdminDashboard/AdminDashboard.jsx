import React from 'react'
import Layout from '../Layout'
import Sidebar from '../Sidebar';
import "../dashboard-data (1)"
import { roleBasedDashboardData } from '../dashboard-data (1)';
const AdminDashboard = () => {
  return (
    <div className='flex w-screen bg-[#0f1322] flex-row'>
        <Sidebar Title={roleBasedDashboardData.university.header.title} distribution={'Faculties'} faculties={roleBasedDashboardData.university.distribution}/>
        <Layout data={roleBasedDashboardData.university.stats} weeklyDistribution={roleBasedDashboardData.attendanceTrend} distribution={roleBasedDashboardData.university.distribution}/>
    </div>
  );
}

export default AdminDashboard
import React from 'react'
import Layout from '../Layout'
import Sidebar from '../Sidebar';
import "../dashboard-data (1)"
import { roleBasedDashboardData } from '../dashboard-data (1)';

const Departmental = () => {
  return (
    <div className='flex w-full bg-[#0f1322]'>
        <Sidebar Title={roleBasedDashboardData.department.header.title} distribution={'Class'} faculties={roleBasedDashboardData.department.distribution}/>
        <Layout data={roleBasedDashboardData.department.stats} weeklyDistribution={roleBasedDashboardData.attendanceTrend} distribution={roleBasedDashboardData.department.distribution}/>
    </div>       
  )
}

export default Departmental

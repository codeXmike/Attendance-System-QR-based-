import React from 'react'
import Layout from '../Layout'
import Sidebar from '../Sidebar';
import "../dashboard-data (1)"
import { roleBasedDashboardData } from '../dashboard-data (1)';
const Faculty = () => {
  return (
    <div className='flex w-full bg-[#0f1322]'>
        <Sidebar Title={roleBasedDashboardData.faculty.header.title} distribution={'Departments'} faculties={roleBasedDashboardData.faculty.distribution}/>
        <Layout data={roleBasedDashboardData.faculty.stats} weeklyDistribution={roleBasedDashboardData.attendanceTrend} distribution={roleBasedDashboardData.faculty.distribution}/>
    </div>    
  )
}

export default Faculty

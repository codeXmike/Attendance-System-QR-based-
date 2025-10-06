import React from 'react'
import Layout from '../Layout'
import Sidebar from '../Sidebar';
import "../dashboard-data (1)"
import { roleBasedDashboardData } from '../dashboard-data (1)';

const Class = () => {
  return (
    <div className='flex w-full bg-[#0f1322]'>
        <Sidebar Title={roleBasedDashboardData.class.header.title} distribution={'Never'} faculties={roleBasedDashboardData.class.distribution}/>
        <Layout data={roleBasedDashboardData.class.stats} weeklyDistribution={roleBasedDashboardData.attendanceTrend} distribution={roleBasedDashboardData.university.distribution}/>
    </div>    
  )
}

export default Class

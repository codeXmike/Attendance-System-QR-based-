import React, { useContext, useState } from 'react'
import Layout from '../../layouts/Layout';
import Sidebar from '../../layouts/Sidebar';
import "./dashboard-data (1)"
import { roleBasedDashboardData } from './dashboard-data (1)';
import { useAuth } from '../../context/AuthContext';
const AdminDashboard = () => {
    const admin = useAuth()
    console.log("Role", admin)
    const [loggedAdmin, setLoggedAdmin] = useState({role: "super"})
    const roleDict = {
        "super": {
            "title":roleBasedDashboardData.university.header.title,
            "distribution":'Faculty',
            "faculties":roleBasedDashboardData.university.distribution,
            "data":roleBasedDashboardData.university.stats,
            "weeklyDistribution":roleBasedDashboardData.attendanceTrend
        },
        "faculty": {
            "title":roleBasedDashboardData.university.header.title,
            "distribution":'Faculty',
            "faculties":roleBasedDashboardData.university.distribution,
            "data":roleBasedDashboardData.university.stats,
            "weeklyDistribution":roleBasedDashboardData.attendanceTrend
        },
    }
    loggedAdmin.role
  return (
    <div className=' w-full bg-[#0f1322] grid grid-cols-[25%_75%]'>
        <Sidebar Title={roleDict[loggedAdmin.role].title} distribution={roleDict[loggedAdmin.role].distribution} faculties={roleDict[loggedAdmin.role].faculties}/>
        <Layout data={roleDict[loggedAdmin.role].data} weeklyDistribution={roleDict[loggedAdmin.role].weeklyDistribution} distribution={roleDict[loggedAdmin.role].faculties}/>
    </div>
  );
}

export default AdminDashboard
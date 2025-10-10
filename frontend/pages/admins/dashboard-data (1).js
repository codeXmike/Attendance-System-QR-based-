// Role-based dashboard data
export const roleBasedDashboardData = {
  attendanceTrend: [
    { week: "2024-W45", rate: "78.5" },
    { week: "2024-W46", rate: "82.1" },
    { week: "2024-W47", rate: "85.3" },
    { week: "2024-W48", rate: "79.8" }
  ],
  // UNIVERSITY LEVEL (Super Admin)
  university: {
    header: {
      title: "Godfrey Okoye University",
      subtitle: "monitor and manage attendance data"
    },
    stats: {
      totalStudents: 1893,
      scansToday: 302,
      pendingIssues: 4,
      attendanceRate: 98.2
    },
    distribution: [
      { name: "Faculty of Computing & IT", studentCount: 500 },
      { name: "Faculty of Engineering", studentCount: 450 },
      { name: "Faculty of Science", studentCount: 400 },
      { name: "Faculty of Arts", studentCount: 300 },
      { name: "Faculty of Management", studentCount: 243 },      
    ],
    recentActivity: [
      {
        sessionName: "MAT 101 Attendance Submitted",
        time: "8 mins ago",
        type: "lecture"
      },
      {
        sessionName: "VC MASS Attendance Submitted", 
        time: "2 hrs ago",
        type: "event"
      },
      {
        sessionName: "CSC 304 Attendance Submitted",
        time: "2 hrs ago", 
        type: "lecture"
      }
    ]
  },

  // FACULTY LEVEL
  faculty: {
    header: {
      title: "Faculty of Computing & Information Technology", 
      subtitle: "monitor and manage attendance data"
    },
    stats: {
      totalStudents: 500,
      scansToday: 125,
      pendingIssues: 4,
      attendanceRate: 99.9
    },
    distribution: [
      { name: "Computer Science", studentCount: 350 },
      { name: "Software Engineering", studentCount: 150 },
      { name: "Information Technology", studentCount: 100 },
      { name: "Cybersecurity", studentCount: 100 }
    ],
    recentActivity: [
      {
        sessionName: "MAT 101 Attendance Submitted",
        time: "8 mins ago",
        type: "lecture"
      },
      {
        sessionName: "VC MASS Attendance Submitted",
        time: "2 hrs ago", 
        type: "event"
      },
      {
        sessionName: "CSC 304 Attendance Submitted",
        time: "2 hrs ago",
        type: "lecture"
      }
    ]
  },

  // DEPARTMENT LEVEL  
  department: {
    header: {
      title: "Computer Science",
      subtitle: "monitor and manage attendance data"
    },
    stats: {
      totalStudents: 350,
      scansToday: 75,
      pendingIssues: 4,
      attendanceRate: 99.9
    },
    distribution: [
      { name: "Computer Science 100 lvl", studentCount: 70 },
      { name: "Computer Science 200 lvl", studentCount: 65 },
      { name: "Computer Science 300 lvl", studentCount: 60 },
      { name: "Computer Science 400 lvl", studentCount: 55 },
      { name: "Computer Science 500 lvl", studentCount: 50 }
    ],
    recentActivity: [
      {
        sessionName: "MAT 101 Attendance Submitted",
        time: "8 mins ago", 
        type: "lecture"
      },
      {
        sessionName: "VC MASS Attendance Submitted",
        time: "2 hrs ago",
        type: "event"
      },
      {
        sessionName: "CSC 304 Attendance Submitted",
        time: "2 hrs ago",
        type: "lecture"
      }
    ]
  },

  // CLASS LEVEL
  class: {
    header: {
      title: "Computer Science 100 lvl",
      subtitle: "monitor and manage attendance data"
    },
    stats: {
      totalStudents: 70,
      scansToday: 21,
      pendingIssues: 4,
      attendanceRate: 99.9
    },
    distribution: [], // Usually empty for class level
    recentActivity: [
      {
        sessionName: "MAT 101 Attendance Submitted",
        time: "8 mins ago",
        type: "lecture"
      },
      {
        sessionName: "VC MASS Attendance Submitted",
        time: "2 hrs ago",
        type: "event"
      },
      {
        sessionName: "CSC 304 Attendance Submitted", 
        time: "2 hrs ago",
        type: "lecture"
      }
    ]
  }
};
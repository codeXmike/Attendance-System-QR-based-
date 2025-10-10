import React, { useState, useEffect } from 'react';

const AttendanceRecord = () => {
    const [filterHidden, setFilterHidden] = useState(false)
  // Sample data
  const initialSessions = [
    {
      id: 1,
      sessionName: 'VC Mass',
      date: '2024-01-15',
      time: '09:00 AM - 11:00 AM',
      trainer: 'John Smith',
      location: 'Convocation Arena',
      totalAttendees: 25,
      present: 20,
      absent: 5,
      status: 'ongoing'
    },
    {
      id: 2,
      sessionName: 'CSC104 Intro to Software Engineering',
      date: '2024-01-15',
      time: '02:00 PM - 04:00 PM',
      trainer: 'Sarah Johnson',
      location: 'HAll A',
      totalAttendees: 18,
      present: 16,
      absent: 2,
      status: 'completed'
    },
    {
      id: 3,
      sessionName: 'ST MARY\'S Evening Attendance',
      date: '2024-01-16',
      time: '06:00 PM - 08:00 PM',
      trainer: 'Mike Wilson',
      location: 'Training Room B',
      totalAttendees: 30,
      present: 28,
      absent: 2,
      status: 'completed'
    },
    {
      id: 4,
      sessionName: 'Enugu Hackathon Seminar',
      date: '2024-01-20',
      time: '10:00 AM - 12:00 PM',
      trainer: 'Emily Davis',
      location: 'Auditorium',
      totalAttendees: 50,
      present: 45,
      absent: 5,
      status: 'completed'
    },
    {
      id: 1,
      sessionName: 'Morning Training',
      date: '2024-01-15',
      time: '09:00 AM - 11:00 AM',
      trainer: 'John Smith',
      location: 'Main Hall',
      totalAttendees: 25,
      present: 20,
      absent: 5,
      status: 'completed'
    },
    {
      id: 2,
      sessionName: 'Afternoon Workshop',
      date: '2024-01-15',
      time: '02:00 PM - 04:00 PM',
      trainer: 'Sarah Johnson',
      location: 'Conference Room A',
      totalAttendees: 18,
      present: 16,
      absent: 2,
      status: 'completed'
    },
    {
      id: 3,
      sessionName: 'Evening Session',
      date: '2024-01-16',
      time: '06:00 PM - 08:00 PM',
      trainer: 'Mike Wilson',
      location: 'Training Room B',
      totalAttendees: 30,
      present: 28,
      absent: 2,
      status: 'completed'
    },
    {
      id: 4,
      sessionName: 'Weekend Seminar',
      date: '2024-01-20',
      time: '10:00 AM - 12:00 PM',
      trainer: 'Emily Davis',
      location: 'Auditorium',
      totalAttendees: 50,
      present: 45,
      absent: 5,
      status: 'completed'
    }
  ];

  const initialAttendanceRecords = [
    {
      id: 1,
      sessionId: 1,
      userName: 'Alice Johnson',
      userEmail: 'alice@example.com',
      status: 'present',
      checkInTime: '08:55 AM',
      checkOutTime: '11:02 AM',
      duration: '2h 7m'
    },
    {
      id: 2,
      sessionId: 1,
      userName: 'Bob Brown',
      userEmail: 'bob@example.com',
      status: 'present',
      checkInTime: '09:10 AM',
      checkOutTime: '10:45 AM',
      duration: '1h 35m'
    },
    {
      id: 3,
      sessionId: 1,
      userName: 'Carol White',
      userEmail: 'carol@example.com',
      status: 'absent',
      checkInTime: null,
      checkOutTime: null,
      duration: '0h 0m'
    },
    {
      id: 4,
      sessionId: 2,
      userName: 'David Lee',
      userEmail: 'david@example.com',
      status: 'present',
      checkInTime: '01:55 PM',
      checkOutTime: '04:05 PM',
      duration: '2h 10m'
    }
  ];

  // State
  const [sessions, setSessions] = useState(initialSessions);
  const [attendanceRecords, setAttendanceRecords] = useState(initialAttendanceRecords);
  const [selectedSession, setSelectedSession] = useState(null);
  const [filteredRecords, setFilteredRecords] = useState([]);
  
  // Filter states
  const [dateFilter, setDateFilter] = useState('');
  const [trainerFilter, setTrainerFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter sessions
  const filteredSessions = sessions.filter(session => {
    return (
      (dateFilter === '' || session.date === dateFilter) &&
      (trainerFilter === '' || session.trainer.toLowerCase().includes(trainerFilter.toLowerCase())) &&
      (searchTerm === '' || session.sessionName.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  // Filter attendance records
  useEffect(() => {
    if (selectedSession) {
      let filtered = attendanceRecords.filter(record => 
        record.sessionId === selectedSession.id
      );

      if (statusFilter !== 'all') {
        filtered = filtered.filter(record => record.status === statusFilter);
      }

      setFilteredRecords(filtered);
    }
  }, [selectedSession, statusFilter, attendanceRecords]);

  // Stats calculation
  const getSessionStats = (sessionId) => {
    const sessionRecords = attendanceRecords.filter(record => record.sessionId === sessionId);
    const present = sessionRecords.filter(record => record.status === 'present').length;
    const absent = sessionRecords.filter(record => record.status === 'absent').length;
    return { present, absent, total: sessionRecords.length };
  };

  // Handlers
  const handleSessionSelect = (session) => {
    setSelectedSession(session);
  };

  const handleStatusChange = (recordId, newStatus) => {
    setAttendanceRecords(prev => 
      prev.map(record => 
        record.id === recordId ? { ...record, status: newStatus } : record
      )
    );
  };
  const handleFilterVisibility = () => {
    setFilterHidden(!filterHidden)
  };

  const clearFilters = () => {
    setDateFilter('');
    setTrainerFilter('');
    setStatusFilter('all');
    setSearchTerm('');
  };

  return (
    <div className="min-h-screen bg-[#0f1322] text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Attendance Records</h1>
          <p className="text-gray-600 mt-2">Manage and track session attendance</p>
        </div>

        {/* Filters Section */}
        <div className="bg-[#111827] rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Filters</h2>
            <div className='flex w-[13%] justify-around'>
                <button
              onClick={handleFilterVisibility}
              className="text-sm bg-white py-2 px-4 rounded-[10px] text-black hover:cursor-pointer  font-medium"
            >
              {filterHidden? "Hide":"Show"}
            </button>
                <button
              onClick={clearFilters}
              className="text-sm bg-white py-2 px-4 rounded-[10px] text-black hover:cursor-pointer font-medium"
            >
              Clear All
            </button>
            </div>
            
          </div>
          {
            filterHidden &&  
            <div>
                <div className="grid grid-row-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Date Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Trainer Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trainer
              </label>
              <input
                type="text"
                placeholder="Search trainer..."
                value={trainerFilter}
                onChange={(e) => setTrainerFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="present">Present</option>
                <option value="absent">Absent</option>
              </select>
            </div>

            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Sessions
              </label>
              <input
                type="text"
                placeholder="Search session names..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
            </div>
          }
          
        </div>

        <div className=" grid-row-1 lg:grid-row-3 gap-6 bg-[#111827] rounded-lg">
          {/* Sessions List */}
          <div className="lg:col-span-1 ">
            <div className="bg-[#111827] text-white rounded-lg shadow-sm overflow-y-auto custom-scroll  border-gray-200">
              <div className="p-4  border-gray-200">
                <h2 className="text-lg font-semibold ">Sessions</h2>
                <p className="text-sm text-gray-600">{filteredSessions.length} sessions found</p>
              </div>
              
              <div className="max-h-[60vh] overflow-y-auto">
                {filteredSessions.map(session => {
                  const stats = getSessionStats(session.id);
                  return (
                    <div
                      key={session.id}
                      onClick={() => handleSessionSelect(session)}
                      className={`p-4 bg-[#1A1F2F] max-h-[2%] border-gray-100 cursor-pointer rounded-[15px] mx-5 my-3 transition-colors  ${
                        selectedSession?.id === session.id ? 'bg-[#1A1F2F]-83 border-blue-200' : ''
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium ">{session.sessionName}</h3>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium   ${session.status !== "ongoing"? "bg-green-100 text-green-800":"bg-orange-100 text-red-800"}`}>
                          {session.status}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-start space-y-1 text-sm text-gray-600">
                            <p>👤 {session.trainer}</p>
                        <div>
                        <p>📍 {session.location}</p>
                        </div>
                        <p> {session.date} | {session.time}</p>
                        
                      </div>
                      
                      <div className="flex justify-between items-center mt-3">
                        <div className="flex space-x-2">
                          <span className="inline-flex items-center text-sm text-green-600">
                            <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                            {stats.present} Present
                          </span>
                          
                        </div>
                      </div>
                    </div>
                  );
                })}
                
                {filteredSessions.length === 0 && (
                  <div className="p-8 text-center text-gray-500">
                    No sessions found matching your filters.
                  </div>
                )}
              </div>
            </div>
          </div>

         
        </div>
      </div>
    </div>
  );
};

export default AttendanceRecord;
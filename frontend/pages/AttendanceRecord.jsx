import React, { useState, useEffect, useMemo } from 'react';
import { useSession } from '../context/SessionContext';

const AttendanceRecord = () => {
  const { getSessions, sessions } = useSession();
  const [filterHidden, setFilterHidden] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [selectedSession, setSelectedSession] = useState(null);
  const [filteredRecords, setFilteredRecords] = useState([]);
  
  // Filter states
  const [dateFilter, setDateFilter] = useState('');
  const [trainerFilter, setTrainerFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Load sessions on component mount
  useEffect(() => {
    const loadSessions = async () => {
      try {
        setLoading(true);
        await getSessions();
      } catch (err) {
        setError('Failed to load sessions');
        console.error('Error loading sessions:', err);
      } finally {
        setLoading(false);
      }
    };
    
    loadSessions();
  }, []);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Format time for display
  const formatTime = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // Filter sessions based on criteria
  const filteredSessions = useMemo(() => {
    return sessions.filter(session => {
      const sessionDate = session.startedAt ? new Date(session.startedAt).toISOString().split('T')[0] : '';
      
      return (
        (dateFilter === '' || sessionDate === dateFilter) &&
        (trainerFilter === '' || session.audience.toLowerCase().includes(trainerFilter.toLowerCase())) &&
        (statusFilter === 'all' || session.status === statusFilter) &&
        (searchTerm === '' || session.sessionName.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });
  }, [sessions, dateFilter, trainerFilter, statusFilter, searchTerm]);

  // Filter attendance records when session is selected
  useEffect(() => {
    if (selectedSession && selectedSession.records) {
      setFilteredRecords(selectedSession.records);
    } else {
      setFilteredRecords([]);
    }
  }, [selectedSession]);

  // Get session statistics
  const getSessionStats = (session) => {
    if (!session || !session.records) {
      return { present: 0, total: 0 };
    }
    
    const present = session.records.filter(record => 
      record.status === 'Present'
    ).length;
    
    return { 
      present, 
      total: session.records.length 
    };
  };

  // Handlers
  const handleSessionSelect = (session) => {
    setSelectedSession(session);
  };

  const handleStatusChange = (recordId, newStatus) => {
    // Implementation for status change if needed
  };

  const handleFilterVisibility = () => {
    setFilterHidden(!filterHidden);
  };

  const clearFilters = () => {
    setDateFilter('');
    setTrainerFilter('');
    setStatusFilter('all');
    setSearchTerm('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f1322] text-white p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="mt-4">Loading sessions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0f1322] text-white p-6 flex items-center justify-center">
        <div className="text-center text-red-400">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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
            <div className='flex w-[20%] justify-around'>
              <button
                onClick={handleFilterVisibility}
                className="text-sm bg-white py-2 px-4 rounded-[10px] text-black hover:cursor-pointer font-medium"
              >
                {filterHidden ? "Hide" : "Show"}
              </button>
              <button
                onClick={clearFilters}
                className="text-sm bg-white py-2 px-4 rounded-[10px] text-black hover:cursor-pointer font-medium"
              >
                Clear All
              </button>
            </div>
          </div>
          
          {filterHidden && (
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
                    Audience
                  </label>
                  <input
                    type="text"
                    placeholder="Search audience..."
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
                    <option value="ongoing">Ongoing</option>
                    <option value="closed">Closed</option>
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
          )}
        </div>

        <div className="grid-row-1 lg:grid-row-3 gap-6 bg-[#111827] rounded-lg">
          {/* Sessions List */}
          <div className="lg:col-span-1">
            <div className="bg-[#111827] text-white rounded-lg shadow-sm overflow-y-auto custom-scroll border-gray-200">
              <div className="p-4 border-gray-200">
                <h2 className="text-lg font-semibold">Sessions</h2>
                <p className="text-sm text-gray-600">{filteredSessions.length} sessions found</p>
              </div>
              
              <div className="max-h-[60vh] overflow-y-auto">
                {filteredSessions.map(session => {
                  const stats = getSessionStats(session);
                  return (
                    <div
                      key={session.id}
                      onClick={() => handleSessionSelect(session)}
                      className={`p-4 bg-[#1A1F2F] max-h-[2%] border-gray-100 cursor-pointer rounded-[15px] mx-5 my-3 transition-colors ${
                        selectedSession?.id === session.id ? 'bg-[#1A1F2F]-83 border-blue-200' : ''
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{session.sessionName}</h3>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${session.status !== "ongoing"? "bg-green-100 text-green-800":"bg-orange-100 text-red-800"}`}>
                          {session.status}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-start space-y-1 text-sm text-gray-600">
                        <p>👤 {session.audience}</p>
                        <div>
                          <p>📍 {session.location}</p>
                        </div>
                        <p>{formatDate(session.startedAt)} | {session.startedAt ? formatTime(session.startedAt) : 'N/A'}</p>
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
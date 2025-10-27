import Sessions from "../models/Sessions.js";

export const createSession = async(data) => {
  console.log("Creating session with data:", data);
    return await Sessions.create(data);
};
export const endSession = async(id, data) => {
  console.log("Ending session with data:", data);
    const session = await Sessions.findById(id);
    if (!session) throw new Error("Session not found");
    if (!session.status || session.status !== 'in-progress') throw new Error("Session is not active or already ended");
    session.ended_at = new Date();
    session.records = data; // Assuming data contains the attendance records
    session.status = 'closed';

    await session.save();
    return session;
};
export const getAllSessions = async() => {
    return await Sessions.find({});
};
export const getSessionById = async(id) => {
    return await Sessions.findById(id);
};
export const updateSession = async(id, data) => {
    return await Sessions.findByIdAndUpdate(id, data, { new: true });
};
export const deleteSession = async(id) => {
    return await Sessions.findByIdAndDelete(id);
};
export const getSessionsByCourse = async(course_id) => {
    return await Sessions.find({ course_id });
};
export const getSessionsByLecturer = async(lecturer_id) => {
    return await Sessions.find({ lecturer_id });
};
export const getSessionsByDateRange = async(startDate, endDate) => {
    return await Sessions.find({
        date: { $gte: new Date(startDate), $lte: new Date(endDate) },
    });
};
export const getSessionsByStatus = async(status) => {
    return await Sessions.find({ status });
};
export const searchSessions = async (query) => {
  // Search by session_type, status, or created_by (partial match)
  return await Sessions.find({
    $or: [
      { session_type: { $regex: query, $options: 'i' } },
      { status: { $regex: query, $options: 'i' } },
      { created_by_model: { $regex: query, $options: 'i' } },
    ]
  });
};
export const getSessionsByCourseAndDateRange = async (course_id, startDate, endDate) => {
  return await Sessions.find({
    course_id,
    date: { $gte: new Date(startDate), $lte: new Date(endDate) },
  });
};
export const getSessionsByLecturerAndDateRange = async (lecturer_id, startDate, endDate) => {
  return await Sessions.find({
    lecturer_id,
    date: { $gte: new Date(startDate), $lte: new Date(endDate) },
  });
};

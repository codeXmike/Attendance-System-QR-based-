import AttendanceRecords from "../models/AttendanceRecords";
import Students from "../models/Students";
import Lecturers from "../models/Lecturer";
import Courses from "../models/Courses";

export const createAttendanceRecord = async (recordData) => {
  return await AttendanceRecords.create(recordData);
};

export const getAllAttendanceRecords = async () => {
  return await AttendanceRecords.find({});
};
export const getAttendanceRecordById = async (id) => {
    return await AttendanceRecords.findById(id);
};
export const updateAttendanceRecord = async (id, data) => {
  return await AttendanceRecords.findByIdAndUpdate(id, data, { new: true });
};
export const deleteAttendanceRecord = async (id) => {
  return await AttendanceRecords.findByIdAndDelete(id);
};
export const getAttendanceByStudent = async (student_id) => {
  return await AttendanceRecords.find({ student_id });
};
export const getAttendanceByCourse = async (course_id) => {
  return await AttendanceRecords.find({ course_id });
};
export const getAttendanceByLecturer = async (lecturer_id) => {
  return await AttendanceRecords.find({ lecturer_id });
};
export const getAttendanceByDateRange = async (startDate, endDate) => {
  return await AttendanceRecords.find({
    date: { $gte: new Date(startDate), $lte: new Date(endDate) },
  });
};
export const getAttendanceByStatus = async (status) => {
  return await AttendanceRecords.find({ status });
}; 
export const getAttendanceSummaryByStudent = async (student_id) => {
  const totalRecords = await AttendanceRecords.countDocuments({ student_id });
  const presentCount = await AttendanceRecords.countDocuments({ student_id, status: "present" });
  const absentCount = await AttendanceRecords.countDocuments({ student_id, status: "absent" });
  const lateCount = await AttendanceRecords.countDocuments({ student_id, status: "late" });

    return {
    totalRecords,
    presentCount,absentCount,
    lateCount,}
};
export const getAttendanceSummaryByCourse = async (course_id) => {
  const totalRecords = await AttendanceRecords.countDocuments({ course_id });
  const presentCount = await AttendanceRecords.countDocuments({ course_id, status: "present" });
  const absentCount = await AttendanceRecords.countDocuments({ course_id, status: "absent" });
  const lateCount = await AttendanceRecords.countDocuments({ course_id, status: "late" });
    return {
    totalRecords,
    presentCount,
    absentCount,
    lateCount,}
};
export const getAttendanceSummaryByLecturer = async (lecturer_id) => {
  const totalRecords = await AttendanceRecords.countDocuments({ lecturer_id });
  const presentCount = await AttendanceRecords.countDocuments({ lecturer_id, status: "present" });
  const absentCount = await AttendanceRecords.countDocuments({ lecturer_id, status: "absent" });
  const lateCount = await AttendanceRecords.countDocuments({ lecturer_id, status: "late" });
    return {
    totalRecords,
    presentCount,
    absentCount,
    lateCount,}
};
export const searchAttendanceRecords = async (query) => {
  return await AttendanceRecords.find({
    $or: [
      { student_id: { $regex: query, $options: "i" } },   
      { event_id: { $regex: query, $options: "i" } },
    { status: { $regex: query, $options: "i" } }]
    });
};
export const getStudentsWithPerfectAttendance = async () => {
  const students = await Students.find({});
  const perfectAttendanceStudents = [];
    for (const student of students) {
    const totalRecords = await AttendanceRecords.countDocuments({ student_id: student._id });
    const absentCount = await AttendanceRecords.countDocuments({ student_id: student._id, status: "absent" });
    if (totalRecords > 0 && absentCount === 0) {
      perfectAttendanceStudents.push(student);
    }   }
    return perfectAttendanceStudents;
};
export const getCoursesWithHighestAttendance = async (limit = 5) => {
  const attendanceAggregation = await AttendanceRecords.aggregate([
    { $group: { _id: "$course_id", attendanceCount: { $sum: 1 } } },
    { $sort: { attendanceCount: -1 } },
    { $limit: limit },
  ]);
  const courseIds = attendanceAggregation.map(record => record._id);
  return await Courses.find({ _id: { $in: courseIds } });
};

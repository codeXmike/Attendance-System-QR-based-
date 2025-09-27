import Students from "../models/Students";
import Lecturer from "../models/Lecturer";
import Admins from "../models/Admins";
import AttendanceSession from "../models/AttendanceSession.js";
import Faculty from "../models/Faculty.js";
import Department from "../models/Department.js";
import Class from "../models/Class.js";


export const getAdminDashboardStats = async (admin) => {
  try {
    if (!admin) throw new Error("Admin required");

    // ---- Scope filter based on role ----
    let studentFilter = {};
    let sessionFilter = {};

    if (admin.role === "faculty" && admin.faculty_id) {
      const departments = await Department.find({ faculty_id: admin.faculty_id }).select("_id");
      studentFilter.department_id = { $in: departments.map((d) => d._id) };
    }

    if (admin.role === "department" && admin.department_id) {
      studentFilter.department_id = admin.department_id;
    }

    if (admin.role === "class" && admin.class_id) {
      studentFilter.class_id = admin.class_id;
    }

    // ---- Total Students ----
    const totalStudents = await Students.countDocuments(studentFilter);

    // ---- Attendance Sessions Today ----
    const startOfDay = new Date(); startOfDay.setHours(0,0,0,0);
    const endOfDay = new Date();   endOfDay.setHours(23,59,59,999);

    if (Object.keys(studentFilter).length > 0) {
      // restrict sessions to students in scope
      const scopedStudents = await Students.find(studentFilter).select("_id");
      sessionFilter["records.student"] = { $in: scopedStudents.map((s) => s._id) };
    }

    sessionFilter.started_at = { $gte: startOfDay, $lte: endOfDay };

    const todaySessions = await AttendanceSession.find(sessionFilter);
    const scansToday = todaySessions.reduce((acc, s) => acc + s.records.length, 0);

    // ---- Pending Issues (sessions < 50% attendance) ----
    const pendingIssues = todaySessions.filter((s) => {
      const present = s.records.filter((r) => r.status === "Present").length;
      return s.records.length > 0 && present / s.records.length < 0.5;
    }).length;

    // ---- Weekly Attendance Trend (last 4 weeks) ----
    const fourWeeksAgo = new Date();
    fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 28);

    const recentSessions = await AttendanceSession.find({
      started_at: { $gte: fourWeeksAgo },
      ...sessionFilter,
    });

    // group by week
    const trend = {};
    recentSessions.forEach((s) => {
      const week = `${s.started_at.getFullYear()}-W${Math.ceil(s.started_at.getDate() / 7)}`;
      if (!trend[week]) trend[week] = { total: 0, present: 0 };
      trend[week].total += s.records.length;
      trend[week].present += s.records.filter((r) => r.status === "Present").length;
    });

    const attendanceTrend = Object.entries(trend).map(([week, data]) => ({
      week,
      rate: data.total > 0 ? ((data.present / data.total) * 100).toFixed(1) : 0,
    }));

    // ---- Distribution (depends on role) ----
    let distribution = [];
    if (admin.role === "super" || admin.role === "admin") {
      // Faculty distribution
      distribution = await Faculty.aggregate([
        {
          $lookup: {
            from: "departments",
            localField: "_id",
            foreignField: "faculty_id",
            as: "departments",
          },
        },
        {
          $lookup: {
            from: "students",
            localField: "departments._id",
            foreignField: "department_id",
            as: "students",
          },
        },
        {
          $project: { name: 1, studentCount: { $size: "$students" } },
        },
      ]);
    } else if (admin.role === "faculty" && admin.faculty_id) {
      // Department distribution
      distribution = await Department.aggregate([
        { $match: { faculty_id: admin.faculty_id } },
        {
          $lookup: {
            from: "students",
            localField: "_id",
            foreignField: "department_id",
            as: "students",
          },
        },
        {
          $project: { name: 1, studentCount: { $size: "$students" } },
        },
      ]);
    } else if (admin.role === "department" && admin.department_id) {
      // Class distribution
      distribution = await Class.aggregate([
        { $match: { department_id: admin.department_id } },
        {
          $lookup: {
            from: "students",
            localField: "_id",
            foreignField: "class_id",
            as: "students",
          },
        },
        {
          $project: { name: 1, studentCount: { $size: "$students" } },
        },
      ]);
    }

    // ---- Recent Activity ----
    const recentActivity = recentSessions
      .sort((a, b) => b.started_at - a.started_at)
      .slice(0, 5)
      .map((s) => ({
        sessionId: s._id,
        started_at: s.started_at,
        total: s.records.length,
      }));

    return {
      totalStudents,
      scansToday,
      pendingIssues,
      attendanceTrend,
      distribution,
      recentActivity,
    };
  } catch (error) {
    console.error("Error getting admin dashboard stats:", error);
    throw error;
  }
};

export const getLecturerDashboardStats = async (lecturer) => {
  try {
    const lec_id = lecturer._id;
    if (!lec_id) throw new Error("Lecturer id needed");

    const lec = await Lecturer.findById(lec_id);
    if (!lec) throw new Error("Lecturer not found");

    // --- today's courses (by day_of_week) ---
    const todayDay = new Date().toLocaleDateString("en-US", { weekday: "short" });
    const todaysCourses = lec.courses.filter((c) => c.day_of_week === todayDay);

    // --- sessions started today ---
    const startOfDay = new Date(); startOfDay.setHours(0,0,0,0);
    const endOfDay = new Date();   endOfDay.setHours(23,59,59,999);

    const todaySessions = await AttendanceSession.find({
      created_by: lec_id,
      created_by_model: "Lecturer",
      started_at: { $gte: startOfDay, $lte: endOfDay },
    });

    // allow matching by course_id (string) OR subdoc _id (ObjectId)
    const startedRefs = new Set(todaySessions.map((s) => String(s.session_ref)));

    const completed = todaysCourses.filter((c) =>
      startedRefs.has(c.course_id) || startedRefs.has(String(c._id))
    );
    const pending = todaysCourses.filter((c) =>
      !startedRefs.has(c.course_id) && !startedRefs.has(String(c._id))
    );

    // --- average attendance (all sessions by this lecturer) ---
    const allSessions = await AttendanceSession.find({
      created_by: lec_id,
      created_by_model: "Lecturer",
    });

    let totalStudents = 0;
    let totalPresent = 0;
    allSessions.forEach((s) => {
      totalStudents += s.records.length;
      totalPresent += s.records.filter((r) => r.status === "Present").length;
    });

    const avgAttendance = totalStudents > 0 ? (totalPresent / totalStudents) * 100 : 0;

    // --- alerts (low attendance) ---
    const alerts = allSessions.filter((s) => {
      const present = s.records.filter((r) => r.status === "Present").length;
      return s.records.length > 0 && present / s.records.length < 0.5;
    });

    // --- upcoming = all courses lecturer is offering ---
    const upcomingCourses = lec.courses.map((c) => ({
      code: c.course_id,
      name: c.course_name,
    }));

    return {
      today: `${completed.length}/${todaysCourses.length}`,
      avgAttendance: avgAttendance.toFixed(1),
      alerts: alerts.map((a) => ({ sessionId: a._id, started_at: a.started_at })),
      completedCourses: completed.map((c) => ({ code: c.course_id, name: c.course_name })),
      pendingCourses: pending.map((c) => ({ code: c.course_id, name: c.course_name })),
      upcomingCourses,
    };
  } catch (error) {
    console.error("Error getting lecturer dashboard stats:", error);
    throw error;
  }
};

export const getStudentDashboardStats = async (student) => {
  try {
    const studentId = student._id;
    if (!studentId) throw new Error("Student id needed");

    // --- fetch all sessions where this student has a record ---
    const sessions = await AttendanceSession.find({
      "records.student": studentId,
    });

    let totalClasses = 0;
    let classesAttended = 0;

    sessions.forEach((s) => {
      const record = s.records.find((r) => String(r.student) === String(studentId));
      if (record) {
        totalClasses += 1;
        if (record.status === "Present") {
          classesAttended += 1;
        }
      }
    });

    const attendanceRate = totalClasses > 0 ? ((classesAttended / totalClasses) * 100).toFixed(1) : "0.0";

    // --- attendance trend (last 4 weeks) ---
    const now = new Date();
    const trend = [];

    for (let i = 3; i >= 0; i--) {
      const start = new Date(now);
      start.setDate(now.getDate() - i * 7);
      start.setHours(0, 0, 0, 0);

      const end = new Date(start);
      end.setDate(start.getDate() + 6);
      end.setHours(23, 59, 59, 999);

      const weekSessions = sessions.filter(
        (s) => s.started_at >= start && s.started_at <= end
      );

      let weekTotal = 0;
      let weekAttended = 0;

      weekSessions.forEach((s) => {
        const record = s.records.find((r) => String(r.student) === String(studentId));
        if (record) {
          weekTotal++;
          if (record.status === "Present") weekAttended++;
        }
      });

      trend.push({
        weekStart: start.toISOString().slice(0, 10),
        attended: weekAttended,
        total: weekTotal,
      });
    }

    // --- fetch student QR code ---
    const qrDoc = await StudentQR.findOne({ student: studentId });
    const qrCode = qrDoc ? qrDoc.qr_code : null;

    // --- recent activity (last 5 sessions) ---
    const recentSessions = sessions
      .sort((a, b) => b.started_at - a.started_at)
      .slice(0, 5)
      .map((s) => {
        const record = s.records.find((r) => String(r.student) === String(studentId));
        return {
          sessionId: s._id,
          type: s.session_type,
          date: s.started_at,
          status: record ? record.status : "Unknown",
        };
      });

    return {
      totalClasses,
      classesAttended,
      attendanceRate,
      attendanceTrend: trend,
      qrCode,
      activity: recentSessions,
    };
  } catch (error) {
    console.error("Error getting student dashboard stats:", error);
    throw error;
  }
};
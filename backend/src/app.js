import express from 'express';
import attendanceRoutes from './routes/attendanceRoutes.js';
import adminRoutes from './routes/adminRoutes.js'
import authRoutes from './routes/authRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import lecturerRoutes from './routes/lecturerRoutes.js'
import classRoutes from './routes/classRoutes.js'
import sessionRoutes from './routes/sessionRoutes.js';
import studentsRoutes from './routes/studentsRoutes.js';
import reportsAnalyticsRoutes from './routes/reportsAnalyticsRoutes.js';
import utilitiesRoutes from './routes/utilitiesRoutes.js';
import departmentFacultyRoutes from './routes/departmentFacultyRoutes.js'
import cors from 'cors';

const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5173/",
  "http://localhost:3002",
  "http://127.0.0.1:3000",
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS policy: Not allowed by CORS"));
    }
  },
  credentials: true, // allow cookies/authorization headers
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/attendance', attendanceRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/class', classRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/students', studentsRoutes);
app.use('/api/letcurers', lecturerRoutes);
app.use('/api/reports', reportsAnalyticsRoutes);
app.use('/api/utilities', utilitiesRoutes);
app.use('/api/manage', departmentFacultyRoutes);

app.get('/', (req, res) => {
    res.send('University Attendance System API is running');
});

export default app;
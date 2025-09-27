import express from 'express';
import attendanceRoutes from './routes/attendanceRoutes.js';
import authRoutes from './routes/authRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import sessionRoutes from './routes/sessionRoutes.js';
import studentsRoutes from './routes/studentsRoutes.js';
import reportsAnalyticsRoutes from './routes/reportsAnalyticsRoutes.js';
import utilitiesRoutes from './routes/utilitiesRoutes.js';
import cors from 'cors';

const app = express();
// allowedOrigins = ['http://localhost:3002', 'http://localhost:3001']

app.use(cors());

app.use(express.json());
app.use('/api/attendance', attendanceRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/students', studentsRoutes);
app.use('/api/reports', reportsAnalyticsRoutes);
app.use('/api/utilities', utilitiesRoutes);

app.get('/', (req, res) => {
    res.send('University Attendance System API is running');
});

export default app;
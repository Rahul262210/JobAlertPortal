import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import jobRoutes from './routes/jobs.js';
import { errorHandler } from './middleware/auth.js';
import { seedAdmin } from './controllers/authController.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ message: 'Backend is running' });
});

// Error handling
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('API endpoints:');
  console.log(`  POST   /api/auth/login`);
  console.log(`  GET    /api/jobs`);
  console.log(`  GET    /api/jobs/:id`);
  console.log(`  POST   /api/jobs (protected)`);
  console.log(`  PUT    /api/jobs/:id (protected)`);
  console.log(`  DELETE /api/jobs/:id (protected)`);
  
  // Seed default admin on startup
  seedAdmin();
});

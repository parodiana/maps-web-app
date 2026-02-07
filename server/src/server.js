import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import distanceRoutes from './routes/distance.routes.js';

// Get current directory path (ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from server directory
dotenv.config({ path: join(__dirname, '../.env.local') });

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

app.use('/api/', limiter);

// CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',').map(o => o.trim()) || ['http://localhost:5173'];
const isDevelopment = process.env.NODE_ENV !== 'production';

// TEMPORARY: Allow all origins for testing (REMOVE IN PRODUCTION!)
const ALLOW_ALL_ORIGINS = process.env.CORS_ALLOW_ALL === 'true';

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    // TEMPORARY: Allow all origins if flag is set
    if (ALLOW_ALL_ORIGINS) {
      console.log(`⚠️ CORS: Allowing all origins (CORS_ALLOW_ALL=true)`);
      return callback(null, true);
    }

    // In development, allow all origins
    if (isDevelopment) {
      console.log(`✅ CORS: Allowing origin in development: ${origin}`);
      return callback(null, true);
    }

    // In production, check allowed origins
    if (allowedOrigins.indexOf(origin) !== -1) {
      console.log(`✅ CORS: Allowed origin: ${origin}`);
      callback(null, true);
    } else {
      console.error(`❌ CORS blocked origin: ${origin}`);
      console.error(`   Allowed origins: ${allowedOrigins.join(', ')}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/distance', distanceRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Emergency Service Distance & Pricing API is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔒 CORS enabled for: ${allowedOrigins.join(', ')}`);
});

export default app;

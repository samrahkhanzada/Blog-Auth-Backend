import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';

const app = express();

// Database Connection
connectDB();

// Updated CORS Configuration
app.use(cors({
  // Multiple origins allowed (ENV variable + Hardcoded for safety)
  origin: [
    process.env.FRONTEND_URL, 
    'https://blog-auth-frontend.vercel.app'
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);

// Root route for Vercel health check
app.get('/', (req, res) => res.send('API is running...'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// import 'dotenv/config';
// import express from 'express';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import connectDB from './config/db.js';
// import authRoutes from './routes/auth.js';

// const app = express();

// // Database Connection
// connectDB();

// // Updated CORS Configuration
// app.use(cors({
//   // Multiple origins allowed (ENV variable + Hardcoded for safety)
//   origin: [
//     process.env.FRONTEND_URL, 
//     'https://blog-auth-frontend-three.vercel.app/'
//   ],
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"]
// }));

// app.use(express.json());
// app.use(cookieParser());

// // Routes
// app.use('/api/auth', authRoutes);

// // Root route for Vercel health check
// app.get('/', (req, res) => res.send('API is running...'));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';

const app = express();

// Database Connection
connectDB();

// Fixed CORS Configuration
const allowedOrigins = [
  'https://blog-auth-frontend-three.vercel.app', // No trailing slash
  process.env.FRONTEND_URL
].filter(Boolean); // Filters out undefined if ENV is missing

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200 // Some legacy browsers choke on 204
}));

app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);

// Root route for Vercel health check
app.get('/', (req, res) => res.send('API is running...'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

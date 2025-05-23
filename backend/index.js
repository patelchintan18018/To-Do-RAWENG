import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import taskRoutes from './routes/tasks.js';
import path from 'path';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(cors({
    origin :"http://localhost:5173",
    credentials:true
}))
app.use(express.json());

console.log('authRoutes is:', authRoutes);
console.log('taskRoutes is:', taskRoutes);


app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);


    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
    });
    


mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch(err => console.error(err));

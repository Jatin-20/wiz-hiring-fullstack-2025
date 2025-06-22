import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import eventsRouter from './routes/events.js';
import usersRouter from './routes/users.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => res.send("Server is running"));

app.use('/api/events', eventsRouter);
app.use('/api/users', usersRouter); 

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

import express from "express";
import path from "path";
import {ENV} from "./lib/env.js";
import { fileURLToPath } from 'url';
import { connectDB } from "./lib/db.js";


import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const app = express();

const PORT = ENV.PORT || 3000;

app.use(express.json()); //req.body
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if(ENV.NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, '../frontend/dist');
  app.use(express.static(frontendPath));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
  app.get('/test', (req, res) => {
    res.json({ message: 'Server is working' });
});
}

const startServer = async () => {
  try {
    //connectiong mongo db
    await connectDB();

    //starting server
    app.listen(PORT, ()=> {
      console.log("Server running on port", PORT);
    });
  } catch (error){
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};
startServer();

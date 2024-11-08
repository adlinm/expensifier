import express from 'express'
import payload from 'payload'
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();


require('dotenv').config()
const app = express()

// Redirect root to Admin panel
app.get('/', (_, res) => {
  res.redirect('/admin')
})

const start = async () => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })

  // Add your own express routes here

  app.listen(3000)

  app.use(cors({
    origin: 'http://localhost:5173', // URL of your Vite frontend
    credentials: true, // Allow credentials (like cookies) if needed
  }));
  
  app.use(express.json());
}

start()

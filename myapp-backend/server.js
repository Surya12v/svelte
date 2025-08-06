const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const formRoutes = require('./routes/formRoutes');
const chatsRoutes = require('./routes/chatRoutes');
const db = require('./db/db');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

 const corsOptions = {
          origin: 'http://localhost:5173', 
          methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
          credentials: true, 
        };

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/forms', formRoutes);
app.use('/api/chats', chatsRoutes)

// Test DB connection
db.connect((err) => {
    if (err) {
        console.error('❌ Database connection failed:', err.message);
    } else {
        console.log('✅ Connected to MySQL database');
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

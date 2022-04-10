const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');



// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/final', requireAuth, (req, res) => res.render('final'));
app.use(authRoutes);

app.listen(8080, err=>{
  console.log(`Server on http://localhost:${8080}`)
})


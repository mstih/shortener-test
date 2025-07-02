const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const urlRoutes = require('./routes/url');

dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("DB connection failed", err));

app.use('/', urlRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running at https://localhost:${process.env.PORT}`)
})

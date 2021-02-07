const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');

const connectDB = require('./server/database/connection');

const app = express();

dotenv.config({ path: 'config.env' });
const PORT = process.env.PORT || 8080;

// *** Log request ***
app.use(morgan('tiny'));

// *** mongodb connection ***
connectDB();

// *** adds the form to our body property of the request ***
app.use(express.urlencoded({ extended: true }));

// *** set view engin ***
app.set('view engine', 'ejs');

// *** load assets ***
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')));

// *** load routers ***
app.use('/', require('./server/routes/router'));

// *** create local server ***
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

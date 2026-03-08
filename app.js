require('dotenv').config();
const express = require('express');
const app = express();
const expressSession = require('express-session');
const passport = require('./config/passport');
const authRouter = require('./routers/authorRouter');
const messageRouter = require('./routers/messageRouter');
const methodOverride = require('method-override');
app.use(express.static('public'));

// Set EJS as the view engine and specify the views directory
app.set('view engine', 'ejs');
app.set('views', './views');

// Middleware to parse URL-encoded bodies, override HTTP methods, and manage sessions
app.use(express.urlencoded({ extended: true }));
app.use(expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});
app.use(methodOverride('_method'));


app.use('/', authRouter);
app.use('/', messageRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
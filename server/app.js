const express       =  require('express');
const path          =  require('path');
const favicon       =  require('serve-favicon');
const logger        =  require('morgan');
const cookieParser  =  require('cookie-parser');
const bodyParser    =  require('body-parser');
const layouts       =  require('express-ejs-layouts');
const mongoose      =  require('mongoose');
const session       =  require('express-session');
const MongoStore    =  require('connect-mongo')(session);
const passport      =  require('passport');
const configure     =  require('./config/passport.js');
const cors          =  require('cors');

const index         =  require('./routes/index');
const users         =  require('./routes/users');

mongoose.Promise=global.Promise;

var options = {
  useMongoClient: true,
};

mongoose.connect('mongodb://localhost/portfolio',options);

const app = express();

console.log("en app.js");

var whitelist = [
    'http://localhost:4200',
];
var corsOptions = {
    origin: function(origin, callback){
        var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
        callback(null, originIsWhitelisted);
    },
    credentials: true
};
app.use(cors(corsOptions));

app.use(session({
  secret: "Portfolio-blog app",
  cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
  })
}));

configure(passport);

app.use(passport.initialize());
app.use(passport.session());

app.locals.title = 'Express - server portfolioblog';

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static('public'));

app.use(layouts);
app.set('layout', 'layouts/main-layout');
app.set('views', __dirname + '/views');

app.use('/users', users);
app.use('/', index);



//added to start from server
app.use(function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

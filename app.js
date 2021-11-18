const express = require('express');
const app = express();
const indexRouter = require('./src/routes/index.router');
const lkRouter = require('./src/routes/lk.router');
const path = require('path');
const hbs = require('hbs');
require('dotenv').config();

const session = require('express-session')
const FileStore = require('session-file-store')(session)

const PORT = process.env.PORT || 3000;

const sessionConfig = {
  store: new FileStore(), // хранилище сессий
  key: 'session_key', // ключ куки
  secret: 'bvcbgnncliuygfxdd', // шифрование id сессии
  resave: false, // пересохранение сессии (когда что-то поменяли - false)
  saveUninitialized: false, // сохраняем пустую сессию (чтоб посмотреть)
  httpOnly: true, // нельзя изменить куки с фронта
  cookie: { expires: 24 * 60 * 60e3 },
}

app.use(session(sessionConfig))

app.set('view engine', 'hbs');
app.set('views', path.join(process.env.PWD, 'src', 'views'));

hbs.registerPartials(path.join(process.env.PWD, 'src', 'views', 'partials'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.env.PWD, 'public')));

app.use((req, res, next) => {
  if (req.session.userId) {
    res.locals.userId = req.session.userId
    res.locals.userIsadmin = req.session.userIsadmin
  } else
    next()
})

app.use('/', indexRouter);
app.use('/lk', lkRouter);

app.listen(PORT, () => console.log(`Server is working on ${PORT}`));

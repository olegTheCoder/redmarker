const router = require('express').Router()
const bcrypt = require('bcrypt')
const { Search, User } = require('../../db/models')

const saltRounds = 10

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', async (req, res) => {
  try {
    const { url } = req.body
    let result = ''
    const regex = /\w+$/
    if (url.match(regex)[0] === 'ru') {
      result = 'Соответствует'
    }
    else
      result = 'Не соответствует'

    // const user_id = newUser.id
    const newSearch = { url, result }

    // if (req.session.userId) {
    //   const newSearchLog = await Search.create({ url, result, user_id })
    //   req.session.searchUserId = newSearchLog.user_id
    // }

    // res.render('answer', { url, result })
    res.json(newSearch)
  } catch (err) {
    console.log(err)
  }
})

/* Регистрация */
router.get('/sing_up', (req, res) => {
  res.render('sing_up');
});

router.post('/singup', async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  //  try {
    const hashedpass = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({ first_name, last_name, email, password: hashedpass, isadmin: false,});
    req.session.userId = newUser.id;
    req.session.userEmail = newUser.email;
    req.session.first_name = newUser.first_name;
    req.session.last_name = newUser.last_name;
console.log(newUser);
    res.redirect('/');
  // } catch (err) {
  //   console.error(err);
  //   return res.render('error', {
  //     message: `ууупс, что-то пошло не так:
  //     - возможно ты уже регистрировался, войди в систему
  //     - проверь что ввел именно EMAIL`,
  //     error: {}
  //   });
  // }
});


/* Авторизация */
router.get('/sing_in', (req, res) => {
  res.render('sing_in');
});

router.post('/singin', async (req, res) => {
  const { email, password } = req.body;
  console.log('------', email, password);
  
  try {
    const currentUser = await User.findOne({
      where: {
        email: email,
      }
    });

    if(currentUser && (await bcrypt.compare(password, currentUser.password))) {
      req.session.userId = currentUser.id;
      req.session.first_name = currentUser.first_name;
      req.session.last_name = currentUser.last_name;
      req.session.userEmail = currentUser.email;
      req.session.isLogin = true;
    }
    res.redirect('/');

    // res.render('error', {
    //   message: `ууупс, что-то пошло не так:
    //   - возможно ты еще не зарегистрировался
    //   - или ввел неправильные данные`,
    //   error: {}
    // });
  } catch(err) {
    res.render('error', {
      message: `непредвиденные проблемы, уже решаем (нет)`,
      error: {}
    });
  }
});

router.get('/logout', async (req, res) => {
  req.session.destroy();
  res.clearCookie('rmsid');
  res.redirect('/');
});

module.exports = router;


module.exports = router

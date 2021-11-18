const router = require('express').Router();
const { User } = require('../../db/models');
const bcrypt = require('bcrypt');
const saltRounds = 10;



/* Регистрация */
router.get('/sing_up', (req, res) => {
  res.render('sing_up');
});

router.post('/singup', async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
   try {
    const hashedpass = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({ first_name, last_name, email, password: hashedpass });
    req.session.userId = newUser.id;
    req.session.userEmail = newUser.email;
    req.session.first_name = newUser.first_name;
    req.session.last_name = newUser.last_name;

    await User.create({
      first_name,
      last_name,
      email,
      password,
      isadmin: false,
    })
    res.redirect('/');
  } catch (err) {
    console.error(err);
    return res.render('error', {
      message: `ууупс, что-то пошло не так:
      - возможно ты уже регистрировался, войди в систему
      - проверь что ввел именно EMAIL`,
      error: {}
    });
  }
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






// const router = require('express').Router()
// const bcrypt = require('bcrypt')
// const { Search } = require('../../db/models')

// const saltRounds = 10

// router.get('/', (req, res) => {
//   res.render('index')
// })

// router.post('/checkurl', async (req, res) => {
//   try {
//     const { url } = req.body
//     const result = ''
//     const regex = /\w+$/
//     if (url.match(regex)[0] === 'ru') result = 'Соответствует'
//     else result = 'Не соответствует'

//     const newSearch = await Search.create({ url, result, user_id })

//     const userId = newUser.id
//     const userRole = newUser.role

//     req.session.userId = userId
//     req.session.userRole = userRole

//     res.redirect('/')
//   } catch (err) {
//     console.log(err)
//   }
// })

// router.post('/signin', async (req, res) => {
//   const { email, password } = req.body

//   const currUser = await User.findOne({
//     where: {
//       email,
//     },
//     const router = require('express').Router()
// const bcrypt = require('bcrypt')
// const { Search } = require('../../db/models')

// const saltRounds = 10

// router.get('/', (req, res) => {
//   res.render('index')
// })

// router.post('/checkurl', async (req, res) => {
//   try {
//     const { url } = req.body
//     const result = ''
//     const regex = /\w+$/
//     if (url.match(regex)[0] === 'ru') result = 'Соответствует'
//     else result = 'Не соответствует'

//     const newSearch = await Search.create({ url, result, user_id })

//     const userId = newUser.id
//     const userRole = newUser.role

//     req.session.userId = userId
//     req.session.userRole = userRole

//     res.redirect('/')
//   } catch (err) {
//     console.log(err)
//   }
// })

// router.post('/signin', async (req, res) => {
//   const { email, password } = req.body

//   const currUser = await User.findOne({
//     where: {
//       email,
//     },
//   })

//   if (!currUser || !(await bcrypt.compare(password, currUser.password))) {
//     res.redirect('/')
//   }

//   req.session.userId = currUser.id
//   req.session.userIsadmin = currUser.isadmin

//   res.redirect('/')
// })


// module.exports = router

//   })

//   if (!currUser || !(await bcrypt.compare(password, currUser.password))) {
//     res.redirect('/')
//   }

//   req.session.userId = currUser.id
//   req.session.userIsadmin = currUser.isadmin

//   res.redirect('/')
// })


// module.exports = router

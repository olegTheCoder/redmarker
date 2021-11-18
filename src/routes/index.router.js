const router = require('express').Router();
const { User } = require('../../db/models');
const bcrypt = require('bcrypt');
const saltRounds = process.env.SALT_ROUNDS;


/* Регистрация */
router.get('/sing_up', (req, res) => {
  res.render('sing_up');
});

router.post('/sing_up', async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  try {
    const hashedpass = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({ first_name, last_name, email, password: hashedpass });
    req.session.userId = newUser.id;
    req.session.userEmail = newUser.email;
    req.session.first_name = newUser.first_name;
    req.session.last_name = newUser.last_name;
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
router.get('/sing_up', (req, res) => {
  res.render('sing_in');
});

router.post('/sing_up', async (req, res) => {
  const { email, password } = req.body;
  
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
      res.redirect('/');
    }

    res.render('error', {
      message: `ууупс, что-то пошло не так:
      - возможно ты еще не зарегистрировался
      - или ввел неправильные данные`,
      error: {}
    });
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

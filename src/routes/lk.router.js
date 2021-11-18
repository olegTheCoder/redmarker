const router = require('express').Router();
const { User, Search } = require('../../db/models');

router.get('/', async (req, res) => {
  // const { userId } = req.session;
  let user;
  let search;
  let name;
  try {
    user = await User.findAll({
      raw: true,
      attributes: ['first_name'],
      where: { id: 1 }, // исправить user_id
    });
    name = user[0].first_name;
    search = await Search.findAll({
      raw: true,
      where: { user_id: 1 }, // исправить user_id
      order: [['id', 'DESC']],
    });
    for (const key of search) {
      console.log(key.createdAt.toString());
      key.createdAt = key.createdAt.toString().slice(0, 25);
    }
    // console.log(search);
  } catch (error) {
    res.render('error', {
      message: 'Не удалось получить запись из базы данных.',
      error: {},
    });
  }
  res.render('lk', { name, search });
  // мы(сервер) ртисуем ему index (hbs)
});

module.exports = router;

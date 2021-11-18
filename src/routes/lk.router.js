const router = require('express').Router();

router.get('/', (req, res) => {
  // клиент заходит на / и спрашивает с нас данные
  res.render('index');
  // мы(сервер) ртисуем ему index (hbs)
});

module.exports = router;

const router = require('express').Router()
const bcrypt = require('bcrypt')
const { Search } = require('../../db/models')

const saltRounds = 10

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/checkurl', async (req, res) => {
  try {
    const { url } = req.body
    const result = ''
    const regex = /\w+$/
    if (url.match(regex)[0] === 'ru') result = 'Соответствует'
    else result = 'Не соответствует'

    const newSearch = await Search.create({ url, result, user_id })

    const userId = newUser.id
    const userRole = newUser.role

    req.session.userId = userId
    req.session.userRole = userRole

    res.redirect('/')
  } catch (err) {
    console.log(err)
  }
})

router.post('/signin', async (req, res) => {
  const { email, password } = req.body

  const currUser = await User.findOne({
    where: {
      email,
    },
  })

  if (!currUser || !(await bcrypt.compare(password, currUser.password))) {
    res.redirect('/')
  }

  req.session.userId = currUser.id
  req.session.userIsadmin = currUser.isadmin

  res.redirect('/')
})


module.exports = router

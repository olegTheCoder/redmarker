const router = require('express').Router()
const bcrypt = require('bcrypt')
const { Search } = require('../../db/models')

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

    if (req.session.userId) {
      const newSearchLog = await Search.create({ url, result, user_id })
      req.session.searchUserId = newSearchLog.user_id
    }

    // res.render('answer', { url, result })
    res.json(newSearch)
  } catch (err) {
    console.log(err)
  }
})


module.exports = router

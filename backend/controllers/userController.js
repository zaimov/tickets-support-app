const asyncHandler = require('express-async-handler')

/*
* @desc Register a new user
* @route /api/users
* @access Public
*/
const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body)
  const {name, email, password} = req.body

  // simple validation
  if (!name || !email || !password) {
    res.status(400)
    throw new Error('All fields are required')
  }
  res.send('Register Route')
})

/*
* @desc Login a user
* @route /api/users/login
* @access Public
*/
const loginUser = asyncHandler(async (req, res) => {
  res.send('Login Route')
})

module.exports = {
  registerUser,
  loginUser,
}
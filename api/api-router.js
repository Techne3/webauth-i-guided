const router = require('express').Router();

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');
const bcrypt = require('bcryptjs')

router.use('/auth', authRouter);
router.use('/users', usersRouter);

router.get('/', (req, res) => {
  res.json({ api: "It's alive" });
});

router.post('/hash', (req,res)=> {
  //read a password from the body 
  let password = req.body.password;
  
  //return it to the user in an object that looks like {password: 'original password', hash: 'hashed password'}
  const hash = bcrypt.hashSync(password, 14)
  
  //hash the password 
  res.status(200).json({password, hash})

})
module.exports = router;

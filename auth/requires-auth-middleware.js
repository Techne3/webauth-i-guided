const Users = require('../users/users-model')
const bcrypt = require('bcryptjs')

module.exports=(req,res,next) => {
    let { username, password } = req.headers;

    if(username && password){
    Users.findBy({ username })
      .first()
      .then(user => {
        // check that the password is valid
        if (user && bcrypt.compareSync(password, user.password )) {
          res.status(200).json({ message: `Welcome ${user.username}!` });
          next(); // this is different from the login file
        } else {
          res.status(401).json({ message: 'Invalid Credentials' });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
    }else{
        res.status(400).json({message: 'please provide cred'})
    }
}
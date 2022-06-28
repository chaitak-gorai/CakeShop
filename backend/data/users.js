import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'admin',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('admin', 10),
    isAdmin: true,
  },
  {
    name: 'Captcha',
    email: 'john@gmail.com',
    password: bcrypt.hashSync('user', 10),
  },
  {
    name: 'Jane',
    email: 'jane@gmail.com',
    password: bcrypt.hashSync('user', 10),
  },
]

export default users

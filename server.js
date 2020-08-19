const express = require('express')
const app = express()


const users = require('./routes/users');

app.use(express.json());

app.use('/api/users',users);

app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.listen(3000, () => console.log('Listening on port 3000'));
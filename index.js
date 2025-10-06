const path = require('path');
const express = require('express');
const app = express();

const userRouter = require('./routes/users');

app.use(express.json());
app.use('/api/v1/user', userRouter);

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.use((err, req, res, next) => {
  res.status(500).send('Server Error');
});

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log('Web Server is listening at port ' + PORT);
});

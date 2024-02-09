const express = require('express');
const app = express();
const port = process.env.NODE_LOCAL_PORT || 9090;

app.get('/', (req, res) => {
  res.send('Example app');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`);
});
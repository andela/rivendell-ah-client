const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

const PORT = process.env.PORT || 4000;
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.all('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
app.listen(PORT, () => {
  console.log(`server runing on port${PORT}`);
});

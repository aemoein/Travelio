const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));
app.use('/assets', express.static(path.join(__dirname, 'public/Assets')));

app.get('/api/files', (req, res) => {
  const directoryPath = path.join(__dirname, 'public/Assets');
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return res.status(500).send('Unable to scan directory: ' + err);
    }
    res.send(files);
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
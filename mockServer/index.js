/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const multer = require('multer');
const cors = require('cors');
/* eslint-enable import/no-extraneous-dependencies */

const PORT = 1986;

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './images/');
  },
  filename(req, file, cb) {
    cb(null, `${file.originalname}`);
  },
});

// const upload = multer({ dest: './images' });
const upload = multer({ storage });

const app = express();

app.use('/images', express.static('images'));

app.use(cors());

app.post('/api/upload/images', upload.single('file'), (req, res) => {
  res.send(JSON.stringify({
    code: 0,
    data: {
      url: `http://192.168.31.145:1986/images/${req.file.filename}`,
    },
  }));
});

app.get('/api/test', (req, res) => {
  res.json({
    code: 0,
    data: {
      foo: 'foo',
    },
  });
});

app.listen(PORT, () => console.log(`Mock server is running on port: ${PORT}`));

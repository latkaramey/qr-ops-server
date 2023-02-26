

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


const qrCode = require('qrcode-reader');
const jimp = require('jimp');
const multer = require('multer');



const app = express();
const port = process.env.PORT || 4000;



// enable CORS
app.use(cors());
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));





// request handlers
app.get('/', (req, res) => {
 
  res.send('QR code app is up and running! - ');
});








const upload = multer({ dest: 'uploads/' }); // Define a storage location for uploaded files

app.post('/decode', upload.single('imageData'), async (req, res) => {
  const filePath = req.file.path;

  try {
    const image = await jimp.read(filePath);
    const qr = new qrCode();
    qr.callback = (err, value) => {
      if (err) {
        res.status(400).json({ message: 'Unable to decode QR code' });
      } else {
        res.json({ data: value.result });
      }
    };
    qr.decode(image.bitmap);
  } catch (err) {
    res.status(400).json({ message: 'Invalid image data again and again' });
  }
});








app.listen(port, () => {
  console.log('Server started on: ' + port);
});

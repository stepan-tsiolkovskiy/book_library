import multer from 'multer';

// Create Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const fileExtension = file.originalname.split('.').pop();
    const fileName = file.fieldname + '-' + uniqueSuffix + '.' + fileExtension;
    cb(null, fileName);
  },
});

// Initialize Multer with storage configuration
const upload = multer({ storage: storage });

// Multer middleware for handling file uploads
const uploadMiddleware = upload.single('image');

// Export the Multer middleware function
export default uploadMiddleware;

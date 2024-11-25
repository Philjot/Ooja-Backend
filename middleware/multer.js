// middleware/multer.js
import multer from 'multer';
import path from 'path';
import cloudinary from '../config/cloudinary.js';
import {CloudinaryStorage} from 'multer-storage-cloudinary'



const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'products',
    allowed_formats: ['jpeg', 'jpg', 'gif', 'png'],
  },
})

// // Configure storage for uploaded files
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/'); // Folder to store uploaded files
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}${path.extname(file.originalname)}`); // Unique filenames
//   },
// });

// // Initialize Multer with file size limit and allowed file types
// const storage = multer({ 
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5 MB
//   fileFilter: (req, file, cb) => {
//     const allowedTypes = /jpeg|jpg|png|gif/;
//     const mimeType = allowedTypes.test(file.mimetype);
//     const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//     if (mimeType && extName) {
//       cb(null, true);
//     } else {
//       cb(new Error("Only images are allowed"));
//     }
//   }
// });

const upload = multer({ storage });

export default upload;
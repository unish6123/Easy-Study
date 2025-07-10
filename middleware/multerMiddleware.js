// middlewares/uploadAudio.js

import multer from 'multer';
import path from 'path';

// Set up storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // Save inside 'uploads' folder
    },
    filename: (req, file, cb) => {
        // Unique filename: timestamp-originalname
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    }
});


export const uploadAudio = multer({ 
    storage: storage,
    
    limits: { fileSize: 10 * 1024 * 1024 } // Max 10 MB (optional)
});

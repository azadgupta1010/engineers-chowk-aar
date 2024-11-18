/*
import multer from "multer";

const storage = multer.memoryStorage();
export const singleUpload = multer({storage}).single("file");
 */
import multer from "multer";

// Allowed file types (for example: images)
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];

// Set up Multer storage using memoryStorage to store the file in memory
const storage = multer.memoryStorage();

// File filter function to validate file type
const fileFilter = (req, file, cb) => {
    if (!ALLOWED_FILE_TYPES.includes(file.mimetype)) {
        return cb(new Error("Invalid file type. Only JPEG, PNG, and PDF are allowed."), false);
    }
    cb(null, true); // Accept the file
};

// Configure multer with memory storage, file size limit (e.g., 5MB), and file type validation
export const singleUpload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB size limit
    },
    fileFilter,
}).single("file");

// Error handling middleware for file upload errors
export const handleFileUploadErrors = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        // Multer-specific error
        return res.status(400).json({ message: `Multer error: ${err.message}`, success: false });
    } else if (err) {
        // General error
        return res.status(500).json({ message: `Server error: ${err.message}`, success: false });
    }
    next(); // Proceed to the next middleware if no error
};

import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "./uploads/",

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${ext}`);
  },
});

// file type
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif|pdf|txt|doc|odt/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images,pdf and text Only!");
  }
}

// upload
const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).array("files", 10);

export default upload;

/* import path from "path";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, callback) => {
    // File type validation
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg" */
/*   file.mimetype === "application/pdf" ||
      file.mimetype === "text/plain" ||
      file.mimetype ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.mimetype === "application/vnd.oasis.opendocument.text" */
/*   ) {
      callback(null, true);
    } else {
      console.log("Only jpg, jpeg,png &pdf files are supported");

      callback(null, false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
});

export default upload; */

import multer from "multer";
import { extname } from "path"; // Import extname from path module

const storage = (target: string) =>
  multer.diskStorage({
    destination: (req, file, callback) => {
      // the image will be stored to the public images
      callback(null, target ? `public/${target}` : "public/images");
    },
    filename: (req, file, callback) => {
      callback(
        null,
        file.fieldname + "_" + Date.now() + extname(file.originalname) // Use extname directly
      );
    },
  });

const upload = (target: string) => multer({ storage: storage(target) });

export default { upload };

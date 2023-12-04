import { AppDataSource } from "../data-source"
import express from 'express';
import blogRoute from "./routes/blogRoutes"
import userRoute from "./routes/userRoute"
import { authenticate } from "./middlewares/auth"
var multer = require('multer');
var upload = multer();
const cors = require('cors');


const app = express();
const PORT = process.env.PORT || 3000;

AppDataSource.initialize().then(async () => {
  console.log("Connected to DB!");

  // for parsing application/json
  app.use(express.json());

  // for parsing application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: true }));

  // for parsing multipart/form-data
  app.use(express.static('public'));

  app.use(cors());
  app.use(upload.array()); 

  app.use('/api/v1/', userRoute)
  app.use('/api/v1/', authenticate, blogRoute)

  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  })


}).catch(error => console.log(error))

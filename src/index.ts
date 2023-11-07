import { AppDataSource } from "../data-source"
import express,{Request,Response} from 'express';
import blogRoute from "./routes/blogRoutes"
import userRoute from "./routes/userRoute"
const bodyParser = require("body-parser");

const app= express();
const PORT= process.env.PORT || 3000;

AppDataSource.initialize().then(async () => {
console.log("Connected to DB!");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use('/api/v1/',blogRoute)
app.use('/api/v1/',userRoute)


app.listen(PORT,()=>{
  console.log(`Server is listening on port ${PORT}`);
})
    

}).catch(error => console.log(error))

import express from "express";

import cors from "cors";
import UserRoute from "./routes/EmployeeRoute.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(UserRoute);

app.listen(5005, ()=> console.log('Server up and running...'));
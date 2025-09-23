import app from "./src/app.js";
import connectDB from "./src/config/configDB.js";
import dotenv from "dotenv";
dotenv.config();
// connectDB();

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
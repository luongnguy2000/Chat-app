const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/message");
const path = require("path");


const app = express();
dotenv.config()
const router = express.Router()
mongoose.connect(process.env.MONGO, () => {
    console.log("Db connected")
})
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(express.json())
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images");
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
});
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
        return res.status(200).json("File uploded successfully");
    } catch (error) {
        console.error(error);
    }
});


app.use('/auth', authRoute)
app.use('/user', userRoute)
app.use('/post', postRoute)
app.use('/message', messageRoute)
app.use('/conversations', conversationRoute)
app.listen(process.env.PORT, () => {
    console.log(`Server is running at : ${process.env.PORT}`)
})
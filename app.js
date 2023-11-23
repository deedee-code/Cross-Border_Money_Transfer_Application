const express = require("express");
const cors = require('cors');
require('dotenv').config();
const dbConnect = require("./src/config/database");
const userRoute = require('./src/routes/userRoute');

dbConnect();
const app = express();
const port = process.env.PORT || 3500;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: "http://localhost:4500/",
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
);
app.use('/api/user', userRoute)

app.get('/', (req, res) => {
    return res.status(200).send("Server is running Successfully...")
})


dbConnect().then(() => {
    app.listen(port, () => {
        console.log(`Server Listener on port: ${port}`)
    })
})

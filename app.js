const express = require("express");
const cors = require("cors");
const route = require("./router");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({origin: '*'}));

route(app);

app.listen(8192, ()=>{
    console.log("server running at \n\t http://localhost:8192");
})
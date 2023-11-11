const { app } = require("./app");
const { port } = require("./secret");
const mongoConnect = require("./src/config/db");

app.listen(port,()=>{
    console.log(`Server is Running Successfully at http://localhost:${port}`);
    mongoConnect();
});


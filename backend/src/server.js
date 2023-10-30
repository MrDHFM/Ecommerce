const app = require('.');
const { connectDb } = require('./config/db');

const PORT = 3535;
app.listen(PORT, async () => {
    await connectDb()
    console.log("app starts on port: ",PORT)
})
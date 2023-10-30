const  mongoose  = require("mongoose")

const monDbUrl = "mongodb+srv://butchiraju36:y7rcZjrplEdpaWLS@cluster0.pbclsoy.mongodb.net/?retryWrites=true&w=majority"

const connectDb = () => {
    mongoose.connect(monDbUrl)
}

module.exports = {connectDb}
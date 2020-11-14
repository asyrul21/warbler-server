const mongoose = require("mongoose")

mongoose.set("debug", true)
mongoose.Promise = Promise;

// credentials
const mongoUsername = 'asyrul21'
const mongoPW = 'abcd1234'
const dbName = 'warbler-db'

mongoose.connect(`mongodb+srv://${mongoUsername}:${mongoPW}@warblercluster.vmhxl.mongodb.net/${dbName}?retryWrites=true&w=majority`, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to Mongo Instance successfully.");
}).catch((error) => {
    console.log("Error connecting to Mongo Instance.");
    console.log(error);
})

module.exports.User = require("./user")
module.exports.Message = require("./message")
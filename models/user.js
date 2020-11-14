const mongoose = require("mongoose")
const bcrypt = require("bcrypt")


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username : {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profileImageUrl: {
        type: String
    },
    // referencing messages to the user
    messages : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    }]
})

// hasing user password
// hook, right before the save
userSchema.pre("save", async function(req, res, next){
    try{
        if(!this.isModified("password")){
            return next()
        }
        let hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        return next()

    }catch(err){
        return next(err)

    }
})

// instance method to compare password
userSchema.methods.comparePassword = async function(candidatePassword, next){
    console.log('Candidate pword:', candidatePassword);
    try{
        let isMatch = await bcrypt.compare(candidatePassword, this.password)
        return isMatch
    }catch(err){
        return next(err)
    }
}

const User = mongoose.model("User", userSchema)

module.exports = User;
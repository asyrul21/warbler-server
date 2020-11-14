const mongoose = require("mongoose");
const User = require("./user");

const messageSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      maxlength: 160,
    },
    // referencing each message to user
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

// message pre remove hook
messageSchema.pre("remove", async function (next) {
  try {
    // find user
    let user = await User.findById(this.user);

    // remove id of the message
    // remove is mongoose method
    user.messages.remove(this.id);
    // save that user
    await user.save();
    return next();
  } catch (error) {
    return next(error);
  }
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;

const moongose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = moongose.Schema(
  {
    cedula: {
      type: String,
      requireq: true,
    },
    password: {
      type: String,
      requireq: true,
    },
    esAdmin: Boolean,
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const UserModel = moongose.model("users", userSchema);

module.exports = UserModel;

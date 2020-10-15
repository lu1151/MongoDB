const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://lu1151:8836Mong@cluster0.0i63z.mongodb.net/sample_db?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  )
  .then(() => console.log("Hello"))
  .catch(() => console.log("!"));

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  password: String,
  hobbies: [String],
});

const User = mongoose.model("User", userSchema);

// // find
// User.find({ hobbies: { $in: ["Coding"] } }).then((result) =>
//   console.log(result)
// );

// // findOne
// User.findOne({ age: { $gt: 20, $lt: 30 } }).then((result) =>
//   console.log(result)
// );

// // selcet
// User.find()
//   .select("name age -_id")
//   .then((result) => console.log(result));

// sort
// User.find()
//   .select("name age -_id")
//   .sort("-age")
//   .then((result) => console.log(result));

// skip limit
User.find()
  .select("name age -_id")
  .sort("-age")
  .skip(2)
  .limit(3)
  .then((result) => console.log(result));


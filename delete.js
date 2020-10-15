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

// findOneAndDelete
// User.findOneAndDelete({age:"14"}).then(res=>console.log(res));

// deleteMany
User.deleteMany({}).then(res=>console.log(res));



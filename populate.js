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
  .catch((err) => console.log(err));

const userSch = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const postSch = new mongoose.Schema({
  title: {
    type: String,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const User = mongoose.model("User", userSch);
const Post = mongoose.model("Post", postSch);

// User.create({ name: "lu1151" }).then((res) => console.log(res));

// Post.create({
//   title: "How to be a fullstack",
//   author: "5f87b94739ae1943dc2a2424",
// }).then(res=>console.log(res));

Post.find()
  .populate("author")
  .then((res) => console.log(res));

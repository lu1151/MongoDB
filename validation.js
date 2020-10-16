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
  .catch(() => console.log("Failed"));

const blog = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "No title"],
    minlength: [2, "Title too short!"],
    maxlength: 20,
    trim: true,
  },
  age: {
    type: Number,
    min: 17,
    max: 100,
  },
  publicDate: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: String,
    enum: {
      values: ["html", "css", "js", "node"],
      message: "Can only be html, css, js or nodejs",
    },
  },
  author: {
    type: String,
    validate: {
      validator: (v) => {
        return v && v.length > 4;
      },
      message: "Must be more than 4 characters.",
    },
  },
});

const Post = mongoose.model("Post", blog);

Post.create({
  title: "xxx",
  age: 20,
  category: "cssx",
  author: "566",
})
  .then((res) => console.log(res))
  .catch((error) => {
    const err = error.errors;
    for (let k in err) {
      console.log(err[k]["message"]);
    }
  });

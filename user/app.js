const http = require("http");
const mongoose = require("mongoose");
const url = require("url");
const querystring = require("querystring");

// mongodb
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
  .catch(() => console.log("Fail"));

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20,
  },
  age: {
    type: Number,
    min: 10,
    max: 100,
  },
  password: String,
  hobbies: [String],
  email: String,
});

const User = mongoose.model("User", userSchema);

// createServer
const app = http.createServer();

app.on("request", async (req, res) => {
  const method = req.method;
  const { pathname, query } = url.parse(req.url, true);

  if (method == "GET") {
    if (pathname == "/list") {
      // Get users's info form database
      let users = await User.find();

      // html string
      let list = `
      <!DOCTYPE html>
      <html lang="en">
      
      <head>
        <meta charset="UTF-8">
        <title>User List</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
          integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
      </head>

      <body>
        <div class="container">
          <h6>
            <a href="/add" class="btn btn-primary">Add User</a>
          </h6>
          <table class="table table-striped table-bordered">
            <tr>
              <td>Username</td>
              <td>Age</td>
              <td>Hobbies</td>
              <td>Email</td>
              <td>Actions</td>
            </tr>
`;

      users.forEach((item) => {
        list += `
        <tr>
				<td>${item.name}</td>
        <td>${item.age}</td>
        <td>
        `;

        item.hobbies.forEach((item) => {
          list += `
          <span>${item}</span>
				  `;
        });

        list += `
        </td>
        <td>${item.email}</td>
				<td>
					<a href="/remove?id=${item._id}" class="btn btn-danger btn-xs">Delete</a>
					<a href="/modify?id=${item._id}" class="btn btn-success btn-xs">Update</a>
				</td>
			</tr>`;
      });

      list += `
						</table>
					</div>
				</body>
				</html>
			`;

      res.end(list);
    } else if (pathname == "/add") {
      let add = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Sign Up</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
      </head>
      <body>
        <div class="container">
          <h3>Sign Up</h3>
          <form method="post" action="/add" >
            <div class="form-group">
              <label>Username</label>
              <input name="name" type="text" class="form-control" placeholder="Please enter your username">
            </div>
            <div class="form-group">
              <label>Password</label>
              <input name="password" type="password" class="form-control" placeholder="Please enter your password">
            </div>
            <div class="form-group">
              <label>Age</label>
              <input name="age" type="text" class="form-control" placeholder="Please enter your age">
            </div>
            <div class="form-group">
              <label>Email Address</label>
              <input name="email" type="email" class="form-control" placeholder="Please enter your Email address">
            </div>
            <div class="form-group">
              <label>Hobby</label>
              <div>
                <label class="checkbox-inline">
                  <input type="checkbox" value="football" name="hobbies"> Football
                </label>
                <label class="checkbox-inline">
                  <input type="checkbox" value="basketball" name="hobbies"> Basketball
                </label>
                <label class="checkbox-inline">
                  <input type="checkbox" value="boxing" name="hobbies"> Boxing
                </label>
                <label class="checkbox-inline">
                  <input type="checkbox" value="coding" name="hobbies"> Coding
                </label>
                <label class="checkbox-inline">
                  <input type="checkbox" value="naping" name="hobbies"> Naping
                </label>
                <label class="checkbox-inline">
                  <input type="checkbox" value="cooking" name="hobbies"> Cooking
                </label>
              </div>
            </div>
            <button type="submit" class="btn btn-primary">Sign Up</button>
          </form>
        </div>
      </body>
      </html>
      `;
      res.end(add);
    } else if (pathname == "/modify") {
      let user = await User.findOne({ _id: query.id });
      let hobbies = [
        "Football",
        "Basketball",
        "Boxing",
        "Coding",
        "Naping",
        "Cooking",
      ];
      let modify = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Update</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css">
      </head>
      <body>
        <div class="container">
          <h3>Update</h3>
          <form method="post" action="/modify?id=${user._id}" >
            <div class="form-group">
              <label>Username</label>
              <input name="name" value="${user.name}" type="text" class="form-control" placeholder="Please enter your username">
            </div>
            <div class="form-group">
              <label>Password</label>
              <input name="password" value="${user.password}" type="password" class="form-control" placeholder="Please enter your password">
            </div>
            <div class="form-group">
              <label>Age</label>
              <input name="age" value="${user.age}" type="text" class="form-control" placeholder="Please enter your age">
            </div>
            <div class="form-group">
              <label>Email Address</label>
              <input name="email" value="${user.email}" type="email" class="form-control" placeholder="Please enter your Email address">
            </div>
            <div class="form-group">
              <label>Hobby</label>
              <div>
               `;
      hobbies.forEach((item) => {
        let isHobby = user.hobbies.includes(item);
        if (isHobby) {
          modify += `
                <label class="checkbox-inline">
                  <input type="checkbox" value="${item}" name="hobbies" checked> ${item}
                </label>
`;
        } else {
          modify += `
          <label class="checkbox-inline">
            <input type="checkbox" value="${item}" name="hobbies"> ${item}
          </label>
`;
        }
      });
      modify += `     
      </div>
      </div>
      <button type="submit" class="btn btn-primary">Update</button>
    </form>
  </div>
</body>
</html>`;
      res.end(modify);
    } else if (pathname == "/remove") {
      await User.findOneAndDelete({ _id: query.id });
      res.writeHead(301, {
        Location: "/list",
      });
      res.end();
    }
  } else if (method == "POST") {
    if (pathname == "/add") {
      let formData = "";
      req.on("data", (param) => {
        formData += param;
      });
      req.on("end", async () => {
        let user = querystring.parse(formData);
        await User.create(user);

        // 301(redirect) to Loction(/list)
        res.writeHead(301, {
          Location: "/list",
        });
        res.end();
      });
    } else if (pathname == "/modify") {
      let formData = "";
      req.on("data", (param) => {
        formData += param;
      });
      req.on("end", async () => {
        let user = querystring.parse(formData);
        await User.updateOne({ _id: query.id }, user);

        // 301(redirect) to Loction(/list)
        res.writeHead(301, {
          Location: "/list",
        });
        res.end();
      });
    }
  }
});

app.listen(3000);

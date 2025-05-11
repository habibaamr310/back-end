const userSchema = require("../../models/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Signup = async (req, res) => {
  try {
    // Validate request body
    if (!req.body || typeof req.body !== "object") {
      console.log("Invalid request body:", req.body);
      return res.status(400).json({
        status: 400,
        data: {
          message: "Invalid request body",
          received: req.body,
        },
      });
    }

    // Destructure and validate required fields
    const { name, email, password, number } = req.body;

    if (!name || !email || !password || !number) {
      return res.status(400).json({
        status: 400,
        data: {
          message: "All fields (name, email, password, number) are required",
          missing: {
            name: !name,
            email: !email,
            password: !password,
            number: !number,
          },
        },
      });
    }

    // Check if user exists
    const existingUser = await userSchema.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        // 409 Conflict is more appropriate
        status: 409,
        data: {
          message: "Email already exists",
        },
      });
    }

    // Hash password and create user
    const hashedPass = await bcrypt.hash(password, 8);
    const user = new userSchema({
      name,
      email,
      password: hashedPass,
      number,
    });

    await user.save();

    return res.status(201).json({
      status: 201,
      data: {
        message: "User registered successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          number: user.number,
        },
      },
    });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({
      status: 500,
      data: {
        message: "Internal server error",
        error: err.message,
      },
    });
  }
};
const Login = async (req,res) => {
  try {
    if (!req.body || typeof req.body !== "object") {
      console.log("Invalid request body:", req.body);
      return res.status(400).json({
        status: 400,
        data: {
          message: "Invalid request body",
          received: req.body,
        },
      });
    }
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).json({
        status: 404,
        data: { data: null, message: "missing data, we need all" },
      });
    }
    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: 404,
        data: { data: null, message: "email not exist" },
      });
    }

    const checkPass = await bcrypt.compare(password, user.password);

    if (!checkPass) {
      return res.status(201).json({
        status: 200,
        data: { data: null, message: "password not correct" },
      });
    }

    const token = jwt.sign(
      {
        email: user.email,
        password: user.password,
      },
      process.env.sercet_key
    );
    console.log("user logged in");
   
    return res.status(200).json({
      status: 200,
      data: {
        data: token,

        message: "Login successful",
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({
      status: 500,
      data: {
        message: "Internal server error",
        error: err.message,
      },
    });
  }
};
;

module.exports = {
  Login,
  Signup,
};

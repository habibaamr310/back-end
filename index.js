
const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose"); 
const cors = require("cors")
const {router} = require("./routes/users")
const server = express();
const http = require("http");
const app = http.createServer((req, res) => { })
server.use(
  cors({
    origin: "http://localhost:5000", // Or your frontend URL if different
    methods: ["GET", "POST", "PUT", "DELETE"], // Include all needed methods
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // If using cookies/sessions
  })
);
server.use(express.json()); // For JSON bodies
server.use(express.urlencoded({ extended: true })); // For form data

const DB = process.env.DB;

const connectDB = async () => {
  try {
    await mongoose.connect(DB, {
      serverSelectionTimeoutMS: 5000, // 5s timeout
      socketTimeoutMS: 45000, // 45s socket timeout
      maxPoolSize: 10, // Control connection pool size
    });
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ Connection Failed:", err.message);
    process.exit(1);
  }
};

server.use("/users", router);
server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

connectDB(); 
// server.listen(5000, () => {
//   console.log("app running")
  
// })
module.exports = {
  server
}

// server.use((req,res)=>{})
// const users = [
//   {
//     id: 1,
//     name: "John Doe",
//     email: "john@example.com",
//     age: 28,
//     isActive: true,
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     email: "jane@example.com",
//     age: 32,
//     isActive: true,
//   },
//   {
//     id: 3,
//     name: "Robert Johnson",
//     email: "robert@example.com",
//     age: 24,
//     isActive: false,
//   },
//   {
//     id: 4,
//     name: "Emily Davis",
//     email: "emily@example.com",
//     age: 29,
//     isActive: true,
//   },
//   {
//     id: 5,
//     name: "Michael Brown",
//     email: "michael@example.com",
//     age: 35,
//     isActive: false,
//   },
//   {
//     id: 6,
//     name: "Sarah Wilson",
//     email: "sarah@example.com",
//     age: 27,
//     isActive: true,
//   },
//   {
//     id: 7,
//     name: "David Taylor",
//     email: "david@example.com",
//     age: 31,
//     isActive: true,
//   },
//   {
//     id: 8,
//     name: "Jessica Anderson",
//     email: "jessica@example.com",
//     age: 26,
//     isActive: false,
//   },
//   {
//     id: 9,
//     name: "Thomas Martinez",
//     email: "thomas@example.com",
//     age: 33,
//     isActive: true,
//   },
//   {
//     id: 10,
//     name: "Lisa Thomas",
//     email: "lisa@example.com",
//     age: 30,
//     isActive: true,
//   },
//   {
//     id: 11,
//     name: "Daniel Hernandez",
//     email: "daniel@example.com",
//     age: 25,
//     isActive: false,
//   },
//   {
//     id: 12,
//     name: "Amy Young",
//     email: "amy@example.com",
//     age: 29,
//     isActive: true,
//   },
//   {
//     id: 13,
//     name: "Charles Lee",
//     email: "charles@example.com",
//     age: 34,
//     isActive: true,
//   },
//   {
//     id: 14,
//     name: "Karen Walker",
//     email: "karen@example.com",
//     age: 28,
//     isActive: false,
//   },
//   {
//     id: 15,
//     name: "Matthew Allen",
//     email: "matthew@example.com",
//     age: 31,
//     isActive: true,
//   },
//   {
//     id: 16,
//     name: "Angela King",
//     email: "angela@example.com",
//     age: 27,
//     isActive: true,
//   },
//   {
//     id: 17,
//     name: "Christopher Wright",
//     email: "christopher@example.com",
//     age: 36,
//     isActive: false,
//   },
//   {
//     id: 18,
//     name: "Amanda Scott",
//     email: "amanda@example.com",
//     age: 30,
//     isActive: true,
//   },
//   {
//     id: 19,
//     name: "Kevin Green",
//     email: "kevin@example.com",
//     age: 32,
//     isActive: true,
//   },
//   {
//     id: 20,
//     name: "Melissa Adams",
//     email: "melissa@example.com",
//     age: 29,
//     isActive: false,
//   },
//   {
//     id: 21,
//     name: "Joshua Nelson",
//     email: "joshua@example.com",
//     age: 26,
//     isActive: true,
//   },
//   {
//     id: 22,
//     name: "Stephanie Baker",
//     email: "stephanie@example.com",
//     age: 33,
//     isActive: true,
//   },
//   {
//     id: 23,
//     name: "Andrew Carter",
//     email: "andrew@example.com",
//     age: 28,
//     isActive: false,
//   },
//   {
//     id: 24,
//     name: "Nicole Mitchell",
//     email: "nicole@example.com",
//     age: 31,
//     isActive: true,
//   },
//   {
//     id: 25,
//     name: "Ryan Perez",
//     email: "ryan@example.com",
//     age: 35,
//     isActive: true,
//   },
//   {
//     id: 26,
//     name: "Heather Roberts",
//     email: "heather@example.com",
//     age: 27,
//     isActive: false,
//   },
//   {
//     id: 27,
//     name: "Jacob Turner",
//     email: "jacob@example.com",
//     age: 30,
//     isActive: true,
//   },
//   {
//     id: 28,
//     name: "Rebecca Phillips",
//     email: "rebecca@example.com",
//     age: 29,
//     isActive: true,
//   },
//   {
//     id: 29,
//     name: "Nathan Campbell",
//     email: "nathan@example.com",
//     age: 34,
//     isActive: false,
//   },
//   {
//     id: 30,
//     name: "Megan Parker",
//     email: "megan@example.com",
//     age: 26,
//     isActive: true,
//   },
//   {
//     id: 31,
//     name: "Justin Evans",
//     email: "justin@example.com",
//     age: 32,
//     isActive: true,
//   },
//   {
//     id: 32,
//     name: "Rachel Edwards",
//     email: "rachel@example.com",
//     age: 28,
//     isActive: false,
//   },
//   {
//     id: 33,
//     name: "Brandon Collins",
//     email: "brandon@example.com",
//     age: 31,
//     isActive: true,
//   },
//   {
//     id: 34,
//     name: "Laura Stewart",
//     email: "laura@example.com",
//     age: 29,
//     isActive: true,
//   },
//   {
//     id: 35,
//     name: "Eric Sanchez",
//     email: "eric@example.com",
//     age: 33,
//     isActive: false,
//   },
//   {
//     id: 36,
//     name: "Christina Morris",
//     email: "christina@example.com",
//     age: 27,
//     isActive: true,
//   },
//   {
//     id: 37,
//     name: "Samuel Rogers",
//     email: "samuel@example.com",
//     age: 30,
//     isActive: true,
//   },
//   {
//     id: 38,
//     name: "Danielle Reed",
//     email: "danielle@example.com",
//     age: 35,
//     isActive: false,
//   },
//   {
//     id: 39,
//     name: "Patrick Cook",
//     email: "patrick@example.com",
//     age: 28,
//     isActive: true,
//   },
//   {
//     id: 40,
//     name: "Olivia Morgan",
//     email: "olivia@example.com",
//     age: 31,
//     isActive: true,
//   },
//   {
//     id: 41,
//     name: "Timothy Bell",
//     email: "timothy@example.com",
//     age: 29,
//     isActive: false,
//   },
//   {
//     id: 42,
//     name: "Samantha Murphy",
//     email: "samantha@example.com",
//     age: 26,
//     isActive: true,
//   },
//   {
//     id: 43,
//     name: "Gregory Bailey",
//     email: "gregory@example.com",
//     age: 32,
//     isActive: true,
//   },
//   {
//     id: 44,
//     name: "Hannah Rivera",
//     email: "hannah@example.com",
//     age: 28,
//     isActive: false,
//   },
//   {
//     id: 45,
//     name: "Aaron Cooper",
//     email: "aaron@example.com",
//     age: 30,
//     isActive: true,
//   },
//   {
//     id: 46,
//     name: "Vanessa Richardson",
//     email: "vanessa@example.com",
//     age: 33,
//     isActive: true,
//   },
//   {
//     id: 47,
//     name: "Peter Cox",
//     email: "peter@example.com",
//     age: 27,
//     isActive: false,
//   },
//   {
//     id: 48,
//     name: "Tiffany Howard",
//     email: "tiffany@example.com",
//     age: 31,
//     isActive: true,
//   },
//   {
//     id: 49,
//     name: "Scott Ward",
//     email: "scott@example.com",
//     age: 29,
//     isActive: true,
//   },
//   {
//     id: 50,
//     name: "Natalie Torres",
//     email: "natalie@example.com",
//     age: 34,
//     isActive: false,
//   },
// ];

// const getUsers = async (req,res) => {
//   res.status(200).json(users);
//   console.log('get all users')
// }
// const addUsers = async () => {
//   console.log("get new user");
// };

// const getSingleUser= async (req,res) => {
//   const { Id } = req.params;
//   const singleUser = users.find((user) => user.id == Id);
//   if (!singleUser) {
//     return res.status(404).json({
//       status: 404, 
//       data :{data :null ,message :"not found"}
//     })
//   }

//   return res.status(200).json({
//     status: 200,
//     data: {
//       data: singleUser,
//       message :"user fetched"
//     }
//   })
// };
// module.exports = {
//   getUsers,
//   addUsers,
//   getSingleUser,

// };
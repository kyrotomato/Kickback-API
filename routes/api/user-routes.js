const router = require('express').Router();
const {
  getAllUsers,
  getUsersById,
  createUsers,
  updateUsers,
  deleteUsers,
  addFriend,
  deleteFriend
} = require('../../controllers/users-controller');

// /api/Users
router
  .route('/')
  .get(getAllUsers)
  .post(createUsers);

// /api/Users/:id
router
  .route('/:id')
  .get(getUsersById)
  .put(updateUsers)
  .delete(deleteUsers);

// Add and delete a friend
//router.route("/:id/friends/:friendsId").post(addFriend).delete(removeFriend);

module.exports = router;
const router = require('express').Router();
const {
  getAllUsers,
  getUsersByID,
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
  .get(getUsersByID)
  .put(updateUsers)
  .delete(deleteUsers);

// Add and delete a friend
router.route("/:id/friends/:friendsId").post(addFriend).delete(removeFriend);
module.exports = router;
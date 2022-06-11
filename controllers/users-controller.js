// Require Users Model
const {Users} = require('../models');

const userController = {
    // get all users
    getAllUsers(req, res) {
      Users.find({})
        .populate({
          path: 'comments',
          select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbUsersData => res.json(dbUsersData))
        .catch(err => {
          console.log(err);
          res.sendStatus(400);
        });
    },
    // get one Users by id
    getUsersById({ params }, res) {
        Users.findOne({ _id: params.id })
          .populate({
            path: 'thoughs',
            select: '-__v'
          })
          .select('-__v')
          .then(dbUsersData => res.json(dbUsersData))
          .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
      },
      
    // createUsers
    createUsers({ body }, res) {
        Users.create(body)
          .then(dbUsersData => res.json(dbUsersData))
          .catch(err => res.json(err));
      },
      
    // update Users by id
    updateUsers({ params, body }, res) {
        Users.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
          .then(dbUsersData => {
            if (!dbThoughData) {
              res.status(404).json({ message: 'No Users found with this id!' });
              return;
            }
            res.json(dbUsersData);
          })
          .catch(err => res.json(err));
      },
      // delete Users
    deleteUsers({ params }, res) {
        Users.findOneAndDelete({ _id: params.id })
          .then(dbUsersData => res.json(dbUsersData))
          .catch(err => res.json(err));
      },
      //add friend
      addFriend({params}, res) {
        Users.findOneAndUpdate({_id: params.id}, {$push: { friends: params.friendId}}, {new: true})
        .populate({path: 'friends', select: ('-__v')})
        .select('-__v')
        .then(dbUsersData => {
            if (!dbUsersData) {
                res.status(404).json({message: 'No User with this ID!'});
                return;
            }
        res.json(dbUsersData);
        })
        .catch(err => res.json(err));  
    },
    // Delete a current Friend
    deleteFriend({ params }, res) {
        Users.findOneAndUpdate({_id: params.id}, {$pull: { friends: params.friendId}}, {new: true})
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then(dbUsersData => {
            if(!dbUsersData) {
                res.status(404).json({message: 'No User with this ID!'});
                return;
            }
            res.json(dbUsersData);
        })
        .catch(err => res.status(400).json(err));
    }

    };
    module.exports = userController; 
const { Thought, Users } = require('../models');


const thoughtsController = {
    // get all thoughts
    getAllThoughts(req, res) {
      Thought.find({})
        .populate({
          path: 'reactions',
          select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
          console.log(err);
          res.sendStatus(400);
        });
    },
  
    // get one thought by id
    getThoughtById({ params }, res) {
      Thought.findOne({ _id: params.id })
        .populate({
          path: 'reaction',
          select: '-__v'
        })
        .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
          console.log(err);
          res.sendStatus(400);
        });
    },
  
    // createThought
    createThought({ body }, res) {
      Thought.create(body)
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    },
  
    // update Thought by id
    updateThought({ params, body }, res) {
      Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbThoughtData => {
          if (!dbThoughData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
          }
          res.json(dbThoughtData);
        })
        .catch(err => res.json(err));
    },
  
    // delete Thought
    deleteThought({ params }, res) {
      Thought.findOneAndDelete({ _id: params.id })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    },
        // createThought
    createThought({ body }, res) {
      Thought.create(body)
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    },
      // createreaction
      addReaction({ body }, res) {
        Reaction.create(body)
          .then(dbReactionData => res.json(dbReactionData))
          .catch(err => res.json(err));
      },
      // delete reaction
      deleteReaction({ params }, res) {
        Reaction.findOneAndDelete({ _id: params.id })
          .then(dbReactionData => res.json(dbReactionData))
          .catch(err => res.json(err));
      }
      
  };
  
  module.exports = thoughtsController;
  
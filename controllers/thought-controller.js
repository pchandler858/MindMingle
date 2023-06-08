const { Thought, User } = require("../models");

const thoughtController = {
  // get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .sort({ _id: -1 })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // get one thought by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })
      .populate({
        path: "reactions",
        select: "-__v",
      })
      .select("-__v")
      .then((dbThoughtData) => {
        // If no thought is found, send 404
        if (!dbThoughtData) {
          res.status(404).json({ message: "Thought not found!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // create thought
  createThought({ body }, res) {
    Thought.create(body)
      .then((dbThoughtData) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: dbThoughtData._id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "User not found!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  // update thought by id
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "Thought not found!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // remove thought
  // deleteThought({ params }, res) {
  //   Thought.findOneAndDelete({ _id: params.thoughtId })
  //     .then((deletedThought) => {
  //       if (!deletedThought) {
  //         return res.status(404).json({ message: "No thought with this id!" });
  //       }
  //       return User.findOneAndUpdate(
  //         { _id: params.userId },
  //         { $pull: { thoughts: params.thoughtId } },
  //         { new: true }
  //       );
  //     })
  //     .then((dbUserData) => {
  //       if (!dbUserData) {
  //         res.status(404).json({ message: "User not found!" });
  //         return;
  //       }
  //       res.json(dbUserData);
  //     })
  //     .catch((err) => res.json(err));
  // },

  // remove thought
  // remove thought
  // deleteThought({ params }, res) {
  //   Thought.findOneAndDelete({ _id: params.thoughtId })
  //     .then((deletedThought) => {
  //       if (!deletedThought) {
  //         return res
  //           .status(404)
  //           .json({ message: "No thought found with this id!" });
  //       }
  //       return User.findOneAndUpdate(
  //         { _id: params.userId },
  //         { $pull: { thoughts: params.thoughtId } },
  //         { new: true }
  //       );
  //     })
  //     .then((dbUserData) => {
  //       if (!dbUserData) {
  //         return res
  //           .status(404)
  //           .json({ message: "No thought found with this id!" });
  //       }
  //       return res.json(dbUserData);
  //     })
  //     .catch((err) => res.status(500).json(err));
  // },

  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then((deletedThought) => {
        if (!deletedThought) {
          return res.status(404).json({ message: "No thought found with this id!" });
        }
        User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { thoughts: params.thoughtId } },
          { new: true }
        )
        .catch((err) => console.log(err)); // log the error if there's one
        return res.status(200).json({ message: "Thought successfully deleted!" });
      })
      .catch((err) => res.status(500).json(err));
  },
  

  
  // add reaction
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "Thought not found!" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  // remove reaction
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { _id: params.reactionId } } },
      { new: true }
    )
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;

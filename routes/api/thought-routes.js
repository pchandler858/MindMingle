const router = require("express").Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thought-controller.js");

// set up GET all and POST at /api/thoughts
router.route("/").get(getAllThoughts).post(createThought);

// set up GET one, PUT, and DELETE at /api/thoughts/:id
router
  .route("/:thoughtId")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// set up POST and DELETE at /api/thoughts/:thoughtId/reactions
router.route("/:thoughtId/reactions").post(addReaction);

// DELETE reaction
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);

module.exports = router;

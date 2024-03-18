const reactions = require("../models/Reaction");
// ! Likes related api

const addReact = async (req, res) => {
  try {
    const userId = req.user.userId;
    const postId = req.body.postId;
    const isLike = req.body.isLike;

    let like = 0;
    let dislike = 0;

    if (isLike) {
      (like = 1), (dislike = 0);
    } else {
      (like = 0), (dislike = 1);
    }

    const existingReaction = await reactions.findOne({
      userId,
      postId,
    });
    if (existingReaction) {
      if (existingReaction.userId !== userId) {
        return res.status(403).send({ message: "Unauthorized access" });
      }
      await reactions.updateOne(
        { _id: existingReaction._id },
        {
          $set: {
            like,
            dislike,
          },
        }
      );
    } else {
      const reaction = {
        userId,
        postId,
        like,
        dislike,
      };
      await reactions.create(reaction);
    }
    return res.status(201).send({ success: true, message: "Reaction added" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const getReact = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.userId;

    const result = await reactions.findOne({ userId });

    const reactionsCursor = await reactions.aggregate([
      {
        $match: { postId },
      },
      {
        $group: {
          _id: null,
          likes: { $sum: "$like" },
          dislikes: { $sum: "$dislike" },
        },
      },
    ]);

    const reactionsArray = await reactionsCursor;
    const reactionsResult = await reactionsArray[0];
    return res.status(200).send({ success: true, result, reactionsResult });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

module.exports = { addReact, getReact };

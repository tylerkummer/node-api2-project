const express = require("express");

const Posts = require("../data/db");

const router = express.Router();

router.post("/", (req, res) => {
  Posts.add(req.query)
    .then((post) => {
      if (post) {
        res.status(201).json(post);
      } else {
        res.status(400).json({
          errorMessage: "Please provide title and contents for the post.",
        });
      }
    })
    .catch((error) => {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: "There was an error while saving the post to the database",
      });
    });
});

router.post("/:id/comments", (req, res) => {
  Posts.add(req.query.id)
    .then((post) => {
      if (post) {
        res.status(201).json(post);
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist.",
        });
      }
    })
    .catch((error) => {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: "There was an error while saving the comment to the database",
      });
    });
});

router.get("/", (req, res) => {
  Posts.find(req.query)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: "The posts information could not be retrieved.",
      });
    });
});

router.get("/:id", (req, res) => {
  Posts.findById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch((error) => {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: "The post information could not be retrieved.",
      });
    });
});

router.get("/:id/comments", (req, res) => {
  Posts.findPostComments(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch((error) => {
      // log error to database
      console.log(error);
      res.status(500).json({
        error: "The comments information could not be retrieved.",
      });
    });
});

router.delete("/:id", (req, res) => {
  Posts.remove(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json({ message: "Deleted" });
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "The post could not be removed" });
    });
});

router.put("/:id", (req, res) => {
  Posts.update(req.params.id, req.body)
    .then((post) => {
      if (post) {
        Posts.findById(req.params.id)
          .then((post) => {
            res.status(200).json(post);
          })
          .catch((error) => {
            console.log(error);
            res
              .status(500)
              .json({
                errorMessage: "The post information could not be modified.",
              });
          });
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch((error) => {
      //log error to database
      console.log(error);
      res.status(500).json({
        error: "The post information could not be modified.",
      });
    });
});

module.exports = router;

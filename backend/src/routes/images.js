// routes/images.js
// This file exports TWO routers, because images are accessed two ways:
//   1. Scoped to a collection: /api/collections/:collectionId/images
//      (listing images, adding a new one)
//   2. By their own ID directly: /api/images/:id
//      (editing or deleting one specific image — at this point we no
//      longer need to know which collection it's in)
//
// { mergeParams: true } is required on collectionImagesRouter so it can
// see :collectionId, which normally belongs to the PARENT router
// (routes/collections.js) that this one gets mounted underneath.

const express = require("express");
const {
  getImagesForCollection,
  addImageToCollection,
  updateImage,
  deleteImage,
} = require("../controllers/imagesController");

const collectionImagesRouter = express.Router({ mergeParams: true });
collectionImagesRouter.get("/", getImagesForCollection);
collectionImagesRouter.post("/", addImageToCollection);

const imageItemRouter = express.Router();
imageItemRouter.put("/:id", updateImage);
imageItemRouter.delete("/:id", deleteImage);

module.exports = { collectionImagesRouter, imageItemRouter };

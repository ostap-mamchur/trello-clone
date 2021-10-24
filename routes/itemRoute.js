const { Router } = require("express");
const itemController = require("../controllers/itemController");

const router = Router();

router.patch("/:id", itemController.updateItemTitle);

router.get("/", itemController.getAllItems);


module.exports = router;

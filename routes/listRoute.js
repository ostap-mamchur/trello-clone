const { Router } = require("express");
const listController = require("../controllers/listController");

const router = Router();

router.post("/", listController.addList);
router.get("/", listController.getLists);
router.delete("/:id", listController.deleteList);
router.post("/:listId/items", listController.addItemToList);
router.delete("/:listId/items/:id", listController.deleteItemFromList);
router.patch("/:listSourceId/items/:id", listController.moveItem)

module.exports = router;

const Item = require("../models/Item.js");

class ItemController {
    async updateItemTitle(req, res) {
       try {
           const { title } = req.body;
           const { id } = req.params;
           const item = await Item.findByIdAndUpdate(
               id,
               { title },
               { returnOriginal: false }
           );
           res.status(200).json(item);
       } catch (e) {
           res.status(500).json(e);
       }
    }
    async getAllItems(req, res) {
        try {
            const items = await Item.find();
            res.status(200).json(items);
        } catch (e) {
            res.status(500).json(e);
        }
    }
}

module.exports = new ItemController();
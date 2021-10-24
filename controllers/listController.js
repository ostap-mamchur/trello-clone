const List = require("../models/List.js");
const Item = require("../models/Item.js");

class ListController {
    async addList(req, res) {
        try {
            const {name} = req.body;
            const list = List({name});
            await list.save();
            res.status(200).json(list);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async getLists(req, res) {
        try {
            const lists = await List.find({})
                .populate('items');

            res.status(200).json(lists);
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async deleteList(req, res) {
        try {
            const {id} = req.params;
            const list = await List.findById(id);
            if (list.items.length === 0) {
                await list.remove();
                res.status(200).json(list);
            } else {
                res.status(405).json("The list still has items");
            }
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async addItemToList(req, res) {
        try {
            const {title} = req.body;
            const {listId} = req.params;
            const item = Item({title});
            await List.findByIdAndUpdate(listId, {$push: {items: item._id}});
            await item.save();
            res.status(200).json(item);
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async deleteItemFromList(req, res) {
        try {
            const {id, listId} = req.params;
            const item = await Item.findByIdAndDelete(id);
            await List.updateOne({_id: listId}, {$pull: {items: item._id}});
            res.status(200).json(item);
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async moveItem(req, res) {
        try {
            const {id, listSourceId} = req.params;
            const {listDestinationId, index} = req.body;
            await List.updateOne({_id: listSourceId}, {$pull: {items: id}});
            await List.updateOne(
                {_id: listDestinationId},
                {
                    $push: {
                        items: {
                            $each: [id],
                            $position: index,
                        },
                    },
                }
            );
            res.status(200).json("The item has been moved");
        }  catch (e) {
            res.status(500).json(e);
        }
    }
}

module.exports = new ListController();

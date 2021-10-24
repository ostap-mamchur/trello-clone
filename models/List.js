const mongoose = require("mongoose");

const { Schema, Types } = mongoose;

const ListSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 16
        },
        items: {
            type: [Types.ObjectId],
            ref: "Item",
            default: []
        }
    },
    {
        versionKey: false,
    }
);

module.exports = mongoose.model("List", ListSchema);
const mongoose = require("mongoose");

const { Schema } = mongoose;

const ItemSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = mongoose.model("Item", ItemSchema);

import mongoose from "mongoose";
const Schema = mongoose.Schema;
const category = new Schema({
    types: {
        type: Array
    },
    areas: {
        type: Array
    },
    city: {
        type: String
    },

});

export default mongoose.model("category", category, "category");
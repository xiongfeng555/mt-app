import mongoose from "mongoose";
const Schema = mongoose.Schema;
const Search = new Schema({
    id: {
        type: String
    },
    name: {
        type: String
    },
    city: {
        type: String
    },
    code: {
        type: String
    },
    description: {
        type: String
    }

});

export default mongoose.model("topsearches", Search, "topsearches");
import mongoose from "mongoose";
const Schema = mongoose.Schema;
const regions = new Schema({
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

export default mongoose.model("regions", regions, "regions");
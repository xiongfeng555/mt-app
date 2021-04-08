import mongoose from "mongoose";
import dbConfig from "../config";
mongoose.connect(dbConfig.dbs, {
    useNewUrlParser: true
});
let Schema = mongoose.Schema();

export default mongoose.model("Province", Schema, "provinces");
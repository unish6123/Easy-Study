
import mongoose, { model } from "mongoose";

const audioSchema = new mongoose.Schema({
    name: {type:String, required:true},
    filePath:{type:String, required:true}, 
    uploadDate: {type:Date, default:Date.now()}

    
})

const audioModel = mongoose.models.audio || mongoose.model('audio', audioSchema);
// creates a new user model if it does not exist and if it exists then it uses that

export default audioModel;
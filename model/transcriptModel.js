
import mongoose, { model } from "mongoose";

const transcriptSchema = new mongoose.Schema({
    transcript: {type:String, required:true}, 
    uploadDate: {type:Date, default:Date.now()}

    
})

const transcriptModel = mongoose.models.transcript || mongoose.model('transcript', transcriptSchema);
// creates a new user model if it does not exist and if it exists then it uses that

export default transcriptModel;

// This controller will recieve a file and save it to the local storage and save the file path to the faDatabase. 
import AudioModel from "../model/audioModel.js";
import TranscriptModel from "../model/transcriptModel.js";
import geminiPrompting from "../gemini/promptGemini.js";

export const audioUpload = async(req,res)=>{
    const file = req.file;
    try{
        if (!file){
            return res.json({success:false, message: "No file uploaded"});
        }
        console.log(file);
        const { filename, path: filePath } = req.file;

        // now saving to database
        const audio = new AudioModel({
            name: filename,
            filePath: `/uploads/${filename}`
        });
        audio.save();
        return res.json({success:true, message: "File uploaded successfully"});
        
       // Assuming you have a folder named 'uploads' in your project directory
        
        

    } catch(error){
        return res.json({success:false, message: error.message})
    }
}

export const getAllRecordings = async(req, res)=>{
    try{
        const recordings = await AudioModel.find({})
            .sort({ uploadDate: -1 })
            .select('name filePath uploadDate');

        if (!recordings){
            return res.json({success:true, message: "No recordings found"});
        }

        return res.json({success:true, data:recordings});
    }catch(error){
        return res.json({success:false, message: error.message})
    }
}

export const uploadTranscripts = async(req,res)=>{
    try{
        const {transcript} = req.body;

        if (!transcript){
            return res.json({success:false, message: "No transcript uploaded"});
        }
        console.log(transcript);

        const transcriptModel = new TranscriptModel({
            transcript: transcript
        });
        transcriptModel.save();
        return res.json({success:true, message: "Transcript uploaded successfully"});

        
    } catch(error){
        return res.json({success:false, message: error.message})
    }
}


export const getQuizzes = async(req, res) => {
    try {
        const transcripts = await TranscriptModel.find({})
            .sort({ uploadDate: -1 })
            .select('transcript uploadDate');

        if (!transcripts || transcripts.length === 0) {
            return res.json({success: true, message: "No transcripts available to generate quizzes."});
        }
        
        try {
            const quizzes = await geminiPrompting(`Generate a quiz with 5 multiple choice questions based on this transcript: ${transcripts[0].transcript}`);
            
            if (!quizzes) {
                return res.json({success: true, message: "No quizzes generated"});
            }
            
            return res.json({success: true, data: quizzes});
        } catch (geminiError) {
            console.error('Gemini API Error:', geminiError);
            return res.json({success: false, message: "Failed to generate quiz"});
        }
    } catch(error) {
        console.error('Database Error:', error);
        return res.json({success: false, message: error.message});
    }
};


import express from 'express';

import { audioUpload, getAllRecordings, uploadTranscripts, getQuizzes} from '../controller/audioUpload.js';
import {uploadAudio} from '../middleware/multerMiddleware.js';



const audioUploadRouter = express.Router();

audioUploadRouter.post('/uploadAudio',uploadAudio.single('audioFile'), audioUpload);
audioUploadRouter.get('/recordings', getAllRecordings);
audioUploadRouter.post('/uploadTranscripts', uploadTranscripts);
audioUploadRouter.get('/quizzes', getQuizzes);


export default audioUploadRouter;
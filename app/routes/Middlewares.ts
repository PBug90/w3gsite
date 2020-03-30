import multer from 'multer'
export const replayUpload = multer({ dest: 'uploads/', storage: multer.memoryStorage() }).single('replay')

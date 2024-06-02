import express from 'express';
import { handleCreatePlaylist } from '../controllers/playlistController.js';

const router = express.Router();

router.post('/create-playlist', handleCreatePlaylist);

export default router;
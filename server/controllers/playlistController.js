import { createPlaylist } from "../services/spotify.js";

export const handleCreatePlaylist = async (req, res) => {
    const { prompt, access_token } = req.body;

    try {
        const playlist = await createPlaylist(prompt, access_token);
        res.send(`Playlist created! <a href="${playlist.external_urls.spotify}">View Playlist</a>`);
    } catch (error) {
        console.error("Failed to create playlist:", error);
        res.send("Failed to create playlist.");
    }
}
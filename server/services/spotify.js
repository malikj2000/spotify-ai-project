import spotifyApi from "../config/spotify.js";
import { interpretPrompt } from './openai.js';

export const createPlaylist = async (prompt, accessToken) => {
    spotifyApi.setAccessToken(accessToken);

    const { artists, genres, attributes } = await interpretPrompt(prompt);

    // Finding artist seeds from artist names
    // Choosing to find the most popular artist in the search results (though could be done any other way)
    const artist_seeds = await Promise.all(artists.map(async artist => {
        const result = await spotifyApi.searchArtists(artist);
        const items = result.body.artists.items;
        if (items.length > 0) {
            const max_popularity = Math.max(...items.map(o => o.popularity));
            const found_artist = items.find(o => o.popularity === max_popularity);
            return found_artist.id;
        }
        return null;
    }));

    const valid_artist_seeds = artist_seeds.filter(id => id !== null);

    if (valid_artist_seeds.length === 0 && genres.length === 0) {
        throw new Error('No valid seed artists or genres found.');
    }

    const min_energy = attributes.energy - 0.1 > 0 ? attributes.energy - 0.1 : 0;
    const max_energy = attributes.energy + 0.1 < 1 ? attributes.energy + 0.1 : 1;
    const min_danceability = attributes.danceability - 0.1 > 0 ? attributes.danceability - 0.1 : 0;
    const max_danceability = attributes.danceability + 0.1 < 1 ? attributes.danceability + 0.1 : 1;

    const recommendationsResponse = await spotifyApi.getRecommendations({
        limit: 50,
        seed_artists: valid_artist_seeds,
        seed_genres: genres,
        min_energy: min_energy,
        max_energy: max_energy,
        min_danceability: min_danceability,
        max_danceability: max_danceability,
    });

    const trackUris = recommendationsResponse.body.tracks.map(track => track.uri);

    const playlistResponse = await spotifyApi.createPlaylist("AI Playlist", {
        description: `A playlist created based on the prompt: "${prompt}"`,
        public: true,
    });

    const playlistId = playlistResponse.body.id;
    await spotifyApi.addTracksToPlaylist(playlistId, trackUris);

    return playlistResponse.body;
}


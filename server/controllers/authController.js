import spotifyApi from "../config/spotify.js";

export const login = (req, res) => {
    const scope = ['user-read-email', 'playlist-modify-public', 'playlist-modify-private'];
    const authorizeURL = spotifyApi.createAuthorizeURL(scope);
    res.redirect(authorizeURL);
};

export const callback = async (req, res) => {
    const { code } = req.query;

    try {
        const data = await spotifyApi.authorizationCodeGrant(code);
        const { access_token, refresh_token, expires_in } = data.body;

        spotifyApi.setAccessToken(access_token);
        spotifyApi.setRefreshToken(refresh_token);

        setInterval(async () => {
            const data = await spotifyApi.refreshAccessToken();
            const accessTokenRefreshed = data.body['access_token'];
            spotifyApi.setAccessToken(accessTokenRefreshed);
        }, expires_in/2 * 1000)

        res.redirect(`https://spotify-ai-playlist-creator-f5deeb7f0c59.herokuapp.com/create-playlist?access_token=${access_token}`);
    } catch (error) {
        console.error('Error getting tokens: ', error);
        res.send('Error getting tokens.');
    }
};
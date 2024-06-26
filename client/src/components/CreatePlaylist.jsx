import { useState, useEffect } from "react";
import { createPlaylist } from "../services/api";

const CreatePlaylist = () => {
    const [prompt, setPrompt] = useState('');
    const [result, setResult] = useState('');
    const [accessToken, setAccessToken] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const data = await createPlaylist(prompt, accessToken);
            setResult(data);
            setPrompt('');
        } catch (error) {
            setResult('Error creating playlist.');
        }
    };

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setAccessToken(params.get('access_token'));
    }, []);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <textarea
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="What kind of playlist do you want to make?"
                    rows="4"
                    cols="50"
                />
                <br></br>
                <button type="submit">Create Playlist</button>
                <br></br>
            </form>
            {result && <div dangerouslySetInnerHTML={{ __html: result }} />}
        </div>
    )
}

export default CreatePlaylist;
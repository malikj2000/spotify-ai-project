import { login } from "../services/api";

const Login = () => {
    return (
        <div>
            <h1>Welcome to the AI Playlist Creator!</h1>
            <button onClick={login}>Login with Spotify</button>
        </div>
    );
};

export default Login
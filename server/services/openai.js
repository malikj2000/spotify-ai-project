import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI();

export const interpretPrompt = async (prompt) => {
    const response = await openai.chat.completions.create({
        messages: [{ role: "system", content: "You are an expert song analyst. Based on a given prompt, you generate a list of relevant artists, genres, and attributes. The list should be formatted as a JSON with keys: 'artists', 'genres', 'attributes' (energy, danceability, valence, instrumentalness, acousticness, loudness, speechiness, tempo). Every attribute besides the tempo should be a number between 0 and 1, and tempo should be in beats per minuite." }, 
                    { role: "user", content: `Generate a list of relevant artists, genres, and track attributes for the following playlist prompt: "${prompt}". There should be a maximum of 2 artists and 3 genres.`}],
        model: "gpt-4o",
        response_format: { type: "json_object" }
    });
    const result = response.choices[0].message.content;
    return JSON.parse(result);
}
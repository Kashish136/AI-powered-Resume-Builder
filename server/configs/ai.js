
// import axios from 'axios';

// const ai = axios.create({
//   baseURL: process.env.OPENAI_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   params: {
//     key: process.env.OPENAI_API_KEY // Gemini uses query param for API key
//   }
// });



import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


export default ai;
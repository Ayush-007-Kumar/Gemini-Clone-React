//AIzaSyCuqkpOO6JBwmYf49ZECrlODjHWU5C3knU
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = "AIzaSyCuqkpOO6JBwmYf49ZECrlODjHWU5C3knU";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    history: [
    ],
  });

  try {
    const result = await chatSession.sendMessage(prompt);
    const responseText = result.response.text();
    return responseText;
  } catch (error) {
    console.error("Error in Gemini API:", error);
    throw new Error("Failed to fetch response from Gemini API.");
  }
}

export default run;
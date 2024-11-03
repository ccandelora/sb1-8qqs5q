import { GoogleGenerativeAI } from '@google/generative-ai';

interface DreamAnalysis {
  symbols: string[];
  interpretation: string;
  mood: string;
  themes: string[];
}

const defaultAnalysis: DreamAnalysis = {
  symbols: ['Dream', 'Subconscious', 'Memory'],
  interpretation: 'Your dream reflects personal experiences and emotions. Consider how it relates to your current life situation.',
  mood: 'Reflective',
  themes: ['Personal', 'Experience', 'Emotion']
};

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || 'dummy-key');
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

const DREAM_ANALYSIS_PROMPT = `Analyze this dream and provide insights. Format the response as JSON with the following structure:
{
  "symbols": string[], // List of key symbols (3-4 items)
  "interpretation": string, // 1-2 sentence interpretation
  "mood": string, // Single word describing the overall mood
  "themes": string[] // List of main themes (2-3 items)
}

Consider psychological symbolism, emotional undertones, and recurring patterns. Keep the interpretation concise but meaningful.

Dream:`;

export async function analyzeDream(dreamContent: string): Promise<DreamAnalysis> {
  if (!import.meta.env.VITE_GEMINI_API_KEY || 
      import.meta.env.VITE_GEMINI_API_KEY === 'your_api_key_here') {
    return defaultAnalysis;
  }

  try {
    const result = await model.generateContent(DREAM_ANALYSIS_PROMPT + '\n' + dreamContent);
    const response = await result.response;
    const text = response.text();
    
    try {
      const analysis = JSON.parse(text);
      
      // Validate the response structure
      if (!analysis.symbols?.length || 
          !analysis.interpretation || 
          !analysis.mood || 
          !analysis.themes?.length) {
        throw new Error('Invalid analysis structure');
      }
      
      return {
        symbols: analysis.symbols.slice(0, 4),
        interpretation: analysis.interpretation,
        mood: analysis.mood,
        themes: analysis.themes.slice(0, 3)
      };
    } catch (parseError) {
      console.error('Failed to parse analysis:', parseError);
      return defaultAnalysis;
    }
  } catch (error) {
    console.error('Dream analysis failed:', error);
    return defaultAnalysis;
  }
}
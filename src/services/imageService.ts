import { GoogleGenerativeAI } from '@google/generative-ai';

interface ImageGenerationResult {
  url: string;
  error?: string;
}

// Curated dream-themed images
const DREAM_IMAGES = {
  peaceful: [
    'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1200&q=80',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80'
  ],
  mystical: [
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&q=80',
    'https://images.unsplash.com/photo-1518066000714-58c45f1a2c0a?w=1200&q=80'
  ],
  surreal: [
    'https://images.unsplash.com/photo-1566808907623-57c6d5b1e640?w=1200&q=80',
    'https://images.unsplash.com/photo-1536152470836-b943b246224c?w=1200&q=80'
  ]
};

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || 'dummy-key');
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

export async function generateDreamImage(dreamContent: string): Promise<ImageGenerationResult> {
  try {
    const result = await model.generateContent(`
      Analyze this dream and return ONLY ONE of these moods: peaceful, mystical, surreal.
      Dream: "${dreamContent}"
      Return only the mood word, nothing else.
    `);

    const response = await result.response;
    const mood = response.text().toLowerCase().trim() as keyof typeof DREAM_IMAGES;
    
    const moodImages = DREAM_IMAGES[mood] || DREAM_IMAGES.surreal;
    const randomIndex = Math.floor(Math.random() * moodImages.length);
    
    return {
      url: moodImages[randomIndex]
    };
  } catch (error) {
    console.error('Image generation failed:', error);
    const fallbackImages = DREAM_IMAGES.surreal;
    return {
      url: fallbackImages[Math.floor(Math.random() * fallbackImages.length)],
      error: 'Using fallback image'
    };
  }
}
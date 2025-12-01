import { GoogleGenAI, Type } from "@google/genai";
import { Product } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const searchProductsWithGemini = async (query: string): Promise<Product[]> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate a list of 8 realistic e-commerce products based on the search query: "${query}". 
      If the query is nonsense, try to guess what user meant or return generic tech items.
      The output must be in Portuguese (Brazil).
      For images, use 'https://picsum.photos/300/300?random=' followed by a random number.
      Make sure prices are realistic numbers. 'originalPrice' should be higher than 'price'.
      'fullDelivery' means 'Chega amanhã' feature.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              price: { type: Type.NUMBER },
              originalPrice: { type: Type.NUMBER },
              imageUrl: { type: Type.STRING },
              freeShipping: { type: Type.BOOLEAN },
              fullDelivery: { type: Type.BOOLEAN },
              reviews: { type: Type.INTEGER },
              discount: { type: Type.INTEGER }
            },
            required: ["id", "title", "price", "imageUrl", "reviews"],
          },
        },
      },
    });

    const text = response.text;
    if (!text) return [];
    
    const data = JSON.parse(text) as Product[];
    // Fix random image caching by appending unique IDs if needed, though the prompt handles it
    return data.map((item, index) => ({
        ...item,
        imageUrl: `https://picsum.photos/300/300?random=${Math.floor(Math.random() * 1000) + index}`
    }));
  } catch (error) {
    console.error("Gemini Search Error:", error);
    return [];
  }
};
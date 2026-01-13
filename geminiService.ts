
import { GoogleGenAI, Type } from "@google/genai";
import { MatchContext, PredictionResult, ConfidenceLevel } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAIPredictionExplanation = async (
  context: MatchContext,
  probs: { probA: number, probB: number, probDraw: number }
): Promise<{ explanation: string; confidence: ConfidenceLevel }> => {
  const { teamA, teamB, sport, location, matchType } = context;

  const prompt = `
    Acts as a world-class professional sports analyst. 
    Analyze the following matchup in ${sport}:
    - Team A: ${teamA.name} (Ranking: ${teamA.ranking}, Win Rate: ${teamA.winRate}%, Form: ${teamA.recentForm.join('-')})
    - Team B: ${teamB.name} (Ranking: ${teamB.ranking}, Win Rate: ${teamB.winRate}%, Form: ${teamB.recentForm.join('-')})
    - Match Details: ${matchType} format, Team A is playing at ${location}.
    - Heuristic Probabilities: ${teamA.name} ${probs.probA}%, ${teamB.name} ${probs.probB}%, Draw ${probs.probDraw}%.

    Provide a professional, data-backed short explanation of why these probabilities were calculated.
    Mention factors like home advantage, recent form, and ranking disparity.
    Also, assign a confidence level (Low, Medium, or High) for this prediction.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            explanation: {
              type: Type.STRING,
              description: "Short tactical explanation for the prediction."
            },
            confidence: {
              type: Type.STRING,
              enum: ["Low", "Medium", "High"],
              description: "Confidence level of the prediction."
            }
          },
          required: ["explanation", "confidence"]
        }
      }
    });

    const result = JSON.parse(response.text || '{}');
    return {
      explanation: result.explanation || "No explanation available.",
      confidence: (result.confidence as ConfidenceLevel) || ConfidenceLevel.MEDIUM
    };
  } catch (error) {
    console.error("AI Prediction error:", error);
    return {
      explanation: "A heuristic match between two competitive sides based on recent form and historical data.",
      confidence: ConfidenceLevel.MEDIUM
    };
  }
};

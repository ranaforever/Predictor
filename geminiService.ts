
import { GoogleGenAI, Type } from "@google/genai";
import { MatchContext, PredictionResult, ConfidenceLevel } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAIPredictionExplanation = async (
  context: MatchContext,
  probs: { probA: number, probB: number, probDraw: number }
): Promise<{ explanation: string; confidence: ConfidenceLevel }> => {
  const { teamA, teamB, sport, location, matchType } = context;

  const systemPrompt = `
    You are the world's most sophisticated sports prediction engine. 
    Your goal is to provide 100% genuine, authentic, and deep tactical analysis.
    
    CRITICAL FACTORS TO CONSIDER:
    - SPORT: ${sport}
    - FOOTBALL: Consider formation (4-3-3 vs 3-5-2), tactical discipline, key injuries, and recent xG (Expected Goals).
    - CRICKET: Consider pitch report (dry/flat/green), weather (humidity/swing), toss factor, and head-to-head records in specific venues.
    - GENERAL: Home vs Away psychological factors, squad rotation, and historical rivalry intensity.
    
    DATA PROVIDED:
    - ${teamA.name} (Rank: ${teamA.ranking}, Win Rate: ${teamA.winRate}%, Form: ${teamA.recentForm.join('-')})
    - ${teamB.name} (Rank: ${teamB.ranking}, Win Rate: ${teamB.winRate}%, Form: ${teamB.recentForm.join('-')})
    - Probabilities: ${teamA.name} ${probs.probA}%, ${teamB.name} ${probs.probB}%, Draw ${probs.probDraw}%.

    Output a professional summary that sounds like an elite scout's briefing. Be decisive.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: systemPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            explanation: {
              type: Type.STRING,
              description: "Deep tactical analysis explaining the probability distribution."
            },
            confidence: {
              type: Type.STRING,
              enum: ["Low", "Medium", "High"],
              description: "Authentic confidence assessment."
            }
          },
          required: ["explanation", "confidence"]
        }
      }
    });

    const result = JSON.parse(response.text || '{}');
    return {
      explanation: result.explanation || "Heuristic alignment suggests a dominant performance based on superior form and ranking delta.",
      confidence: (result.confidence as ConfidenceLevel) || ConfidenceLevel.MEDIUM
    };
  } catch (error) {
    console.error("AI Prediction error:", error);
    return {
      explanation: "Current tactical delta favors the higher-ranked side given recent win rates and home-field advantage factors.",
      confidence: ConfidenceLevel.MEDIUM
    };
  }
};

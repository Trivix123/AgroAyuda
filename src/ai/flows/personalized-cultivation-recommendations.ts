'use server';
/**
 * @fileOverview This file defines a Genkit flow for providing personalized cultivation recommendations.
 *
 * The flow takes crop and planting details as input and returns advice on best practices for soil preparation and seeding.
 *
 * @interface PersonalizedCultivationRecommendationsInput - The input type for the personalized cultivation recommendations flow.
 * @interface PersonalizedCultivationRecommendationsOutput - The output type for the personalized cultivation recommendations flow.
 * @function getPersonalizedCultivationRecommendations - A function that triggers the personalized cultivation recommendations flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedCultivationRecommendationsInputSchema = z.object({
  crop: z.enum(['café', 'caña', 'maíz', 'frijol', 'tomate', 'ayote', 'pepino', 'berenjena']).describe('The crop to be planted.'),
  location: z.string().describe('The location where the crop will be planted (department or zone in El Salvador).'),
  plantingDate: z.string().describe('The date when the crop will be planted (YYYY-MM-DD).'),
  userType: z.enum(['Productor agrícola', 'Huerto urbano']).describe('The type of user (agricultural producer or urban gardener).'),
});
export type PersonalizedCultivationRecommendationsInput = z.infer<typeof PersonalizedCultivationRecommendationsInputSchema>;

const PersonalizedCultivationRecommendationsOutputSchema = z.object({
  soilPreparationRecommendations: z.string().describe('Personalized recommendations for soil preparation.'),
  seedingRecommendations: z.string().describe('Personalized recommendations for seeding practices.'),
});
export type PersonalizedCultivationRecommendationsOutput = z.infer<typeof PersonalizedCultivationRecommendationsOutputSchema>;

export async function getPersonalizedCultivationRecommendations(
  input: PersonalizedCultivationRecommendationsInput
): Promise<PersonalizedCultivationRecommendationsOutput> {
  return personalizedCultivationRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedCultivationRecommendationsPrompt',
  input: {schema: PersonalizedCultivationRecommendationsInputSchema},
  output: {
    schema: PersonalizedCultivationRecommendationsOutputSchema,
  },
  prompt: `You are an expert agricultural advisor for farmers and gardeners in El Salvador.
  Based on the user's input, provide personalized recommendations for soil preparation and seeding.

  - Crop: {{{crop}}}
  - Location: {{{location}}}
  - Planting Date: {{{plantingDate}}}
  - User Type: {{{userType}}}

  You MUST respond with a valid JSON object that strictly conforms to the output schema. Do not add any commentary or text outside of the JSON structure. Your entire response must be ONLY the JSON object.`,
});

const personalizedCultivationRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedCultivationRecommendationsFlow',
    inputSchema: PersonalizedCultivationRecommendationsInputSchema,
    outputSchema: PersonalizedCultivationRecommendationsOutputSchema,
  },
  async (input) => {
    const llmResponse = await prompt(input);
    const textResponse = llmResponse.text || '';
    
    // Robustly extract JSON from the response text.
    // This regex finds a JSON object that is either inside ```json ... ``` or is a standalone object.
    const jsonMatch = textResponse.match(/```json\n([\s\S]*?)\n```|({[\s\S]*})/);

    if (!jsonMatch) {
      console.error("Failed to find JSON in the AI response:", textResponse);
      throw new Error("Failed to find JSON in the AI response.");
    }
    
    // Extract the JSON string from the first capturing group that matched.
    const jsonString = jsonMatch[1] || jsonMatch[2];
    
    try {
      const parsedJson = JSON.parse(jsonString);
      // Validate the parsed JSON against the Zod schema to ensure it's correct.
      const validationResult = PersonalizedCultivationRecommendationsOutputSchema.safeParse(parsedJson);
      
      if (!validationResult.success) {
        console.error("JSON validation failed:", validationResult.error.flatten());
        throw new Error("AI response does not match the required data structure.");
      }
      
      return validationResult.data;
    } catch (e) {
      console.error("Failed to parse JSON from AI response:", e);
      throw new Error("The AI response was not valid JSON.");
    }
  }
);

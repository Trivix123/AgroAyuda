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

const recommendationPrompt = ai.definePrompt(
  {
    name: 'recommendationPrompt',
    input: { schema: PersonalizedCultivationRecommendationsInputSchema },
    output: { schema: PersonalizedCultivationRecommendationsOutputSchema },
    prompt: `Based on the following data for a crop in El Salvador, generate recommendations for soil preparation and seeding.

Input Data:
- Crop: {{{crop}}}
- Location: {{{location}}}
- Planting Date: {{{plantingDate}}}
- User Type: {{{userType}}}
`,
  }
);


const personalizedCultivationRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedCultivationRecommendationsFlow',
    inputSchema: PersonalizedCultivationRecommendationsInputSchema,
    outputSchema: PersonalizedCultivationRecommendationsOutputSchema,
  },
  async (input) => {
    const llmResponse = await recommendationPrompt(input);
    const output = llmResponse.output;

    if (!output) {
      throw new Error('AI model did not return a valid output.');
    }
    return output;
  }
);

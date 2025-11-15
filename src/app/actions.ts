'use server';

import { redirect } from 'next/navigation';
import {
  getPersonalizedCultivationRecommendations,
  type PersonalizedCultivationRecommendationsInput,
} from '@/ai/flows/personalized-cultivation-recommendations';
import { z } from 'zod';

const formSchema = z.object({
  crop: z.enum(['café', 'caña', 'maíz', 'frijol', 'tomate', 'ayote', 'pepino', 'berenjena']),
  location: z.string().min(1, 'La ubicación es requerida.'),
  plantingDate: z.string().min(1, 'La fecha es requerida.'),
  userType: z.enum(['Productor agrícola', 'Huerto urbano']),
});

export async function generateCultivationPlan(formData: FormData) {
  const rawInput = {
    crop: formData.get('crop'),
    location: formData.get('location'),
    plantingDate: formData.get('plantingDate'),
    userType: formData.get('userType'),
  };

  const validationResult = formSchema.safeParse(rawInput);

  if (!validationResult.success) {
    // In a real app, you'd return an error state to the form
    console.error(validationResult.error.flatten().fieldErrors);
    throw new Error('Datos del formulario inválidos.');
  }

  const input: PersonalizedCultivationRecommendationsInput = validationResult.data;

  try {
    const recommendations = await getPersonalizedCultivationRecommendations(input);
    
    const searchParams = new URLSearchParams({
      ...input,
      soil: recommendations.soilPreparationRecommendations,
      seeding: recommendations.seedingRecommendations,
    });
  
    redirect(`/plans/generated?${searchParams.toString()}`);

  } catch (error) {
    console.error("Error generating cultivation plan:", error);
    // In a real app, you would redirect to an error page or show a toast message
    throw new Error('No se pudo generar el plan de cultivo.');
  }
}

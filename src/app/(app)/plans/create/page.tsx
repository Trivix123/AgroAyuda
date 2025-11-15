import { AppHeader } from '@/components/app-header';
import { CreatePlanForm } from '@/components/create-plan-form';
import { Card, CardContent } from '@/components/ui/card';

export default function CreatePlanPage() {
  return (
    <>
      <AppHeader
        title="Asistente de Cultivo IA"
        subtitle="Usa nuestro asistente para obtener recomendaciones personalizadas."
      />
      <div className="max-w-2xl mx-auto">
        <CreatePlanForm />
      </div>
    </>
  );
}

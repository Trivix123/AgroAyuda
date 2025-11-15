import { AppHeader } from '@/components/app-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Download, Printer, Pencil, Calendar, MapPin, Wheat, CheckSquare, Sprout } from 'lucide-react';
import { format, addDays, addWeeks } from 'date-fns';
import { es } from 'date-fns/locale';
import { Suspense } from 'react';
import { Timeline, TimelineConnector, TimelineHeader, TimelineItem, TimelineTitle, TimelineContent } from '@/components/timeline';

function GeneratedPlanContent({
  searchParams,
}: {
  searchParams: {
    crop: string;
    location: string;
    plantingDate: string;
    userType: string;
    soil: string;
    seeding: string;
  };
}) {
  const plantingDate = new Date(searchParams.plantingDate);
  const timelineEvents = [
    { name: 'Siembra', date: plantingDate, description: `Inicio del cultivo de ${searchParams.crop}.`},
    { name: 'Primer Riego Importante', date: addDays(plantingDate, 3), description: "Asegurar humedad para la germinación."},
    { name: 'Primera Fertilización', date: addWeeks(plantingDate, 2), description: "Aplicar nutrientes para el crecimiento inicial."},
    { name: 'Control de Malezas', date: addWeeks(plantingDate, 4), description: "Revisión y limpieza de la zona de cultivo."},
    { name: 'Segunda Fertilización', date: addWeeks(plantingDate, 6), description: "Refuerzo nutricional para la etapa de desarrollo."},
    { name: 'Fecha Estimada de Cosecha', date: addWeeks(plantingDate, 12), description: `Inicio del periodo de cosecha de ${searchParams.crop}.`},
  ];

  return (
    <>
      <AppHeader
        title={`Plan de Cultivo para ${searchParams.crop}`}
        subtitle={`Generado para ${searchParams.location} como ${searchParams.userType}.`}
      >
        <div className="flex gap-2">
            <Button variant="outline"><Pencil className="mr-2 h-4 w-4" /> Editar</Button>
            <Button variant="outline"><Printer className="mr-2 h-4 w-4" /> Imprimir</Button>
            <Button><Download className="mr-2 h-4 w-4" /> Guardar Plan</Button>
        </div>
      </AppHeader>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
           <Card>
            <CardHeader>
              <CardTitle>Línea de Tiempo del Cultivo</CardTitle>
              <CardDescription>Hitos importantes desde la siembra hasta la cosecha.</CardDescription>
            </CardHeader>
            <CardContent>
              <Timeline>
                {timelineEvents.map((event, index) => (
                   <TimelineItem key={index}>
                     <TimelineConnector />
                     <TimelineHeader>
                       <TimelineTitle>{event.name}</TimelineTitle>
                     </TimelineHeader>
                     <TimelineContent>
                        <p className="text-sm font-medium">{format(event.date, "eeee, d 'de' MMMM", { locale: es })}</p>
                        <p className="text-sm text-muted-foreground">{event.description}</p>
                     </TimelineContent>
                   </TimelineItem>
                ))}
              </Timeline>
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Resumen del Plan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                    <div className="flex items-center gap-3">
                        <Wheat className="w-5 h-5 text-primary" />
                        <span className="font-medium">Cultivo:</span>
                        <span className="text-muted-foreground capitalize">{searchParams.crop}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-primary" />
                        <span className="font-medium">Ubicación:</span>
                        <span className="text-muted-foreground">{searchParams.location}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-primary" />
                        <span className="font-medium">Siembra:</span>
                        <span className="text-muted-foreground">{format(plantingDate, "d 'de' MMMM, yyyy", { locale: es })}</span>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-primary/5">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Sprout className="w-5 h-5 text-primary" /> Recomendaciones de Siembra</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-foreground/80">{searchParams.seeding}</p>
                </CardContent>
            </Card>
            <Card className="bg-accent/5">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><CheckSquare className="w-5 h-5 text-accent" /> Preparación del Suelo</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-foreground/80">{searchParams.soil}</p>
                </CardContent>
            </Card>
        </div>
      </div>
    </>
  );
}

export default function GeneratedPlanPage({
  searchParams,
}: {
  searchParams: {
    crop: string;
    location: string;
    plantingDate: string;
    userType: string;
    soil: string;
    seeding: string;
  };
}) {
    return (
        <Suspense fallback={<div>Cargando plan...</div>}>
            <GeneratedPlanContent searchParams={searchParams} />
        </Suspense>
    )
}

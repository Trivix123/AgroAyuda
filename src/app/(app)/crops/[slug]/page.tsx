
'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { crops } from '@/lib/data';
import placeholderImages from '@/lib/placeholder-images.json';
import { AppHeader } from '@/components/app-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Calendar as CalendarIcon, Sun, Droplets, FlaskConical, Leaf, CalendarDays } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Timeline, TimelineItem, TimelineConnector, TimelineHeader, TimelineTitle, TimelineContent } from '@/components/timeline';
import { Calendar } from '@/components/ui/calendar';
import { addDays, format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function CropDetailPage({ params }: { params: { slug: string } }) {
  const crop = crops.find(c => c.slug === params.slug);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  if (!crop) {
    notFound();
  }

  const image = placeholderImages.placeholderImages.find(p => p.id === crop.image);
  const Icon = crop.icon;

  const plantingMonths = crop.optimalPlantingMonths;
  const today = new Date();

  const isPlantingDay = (day: Date) => {
    return plantingMonths.includes(day.getMonth());
  };

  const harvestDate = selectedDate ? addDays(selectedDate, crop.daysToHarvest) : undefined;


  return (
    <>
      <AppHeader title={crop.name}>
        <Link href={`/plans/create?crop=${crop.slug}`}>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Leaf className="mr-2 h-4 w-4" />
                Crear plan con este cultivo
            </Button>
        </Link>
      </AppHeader>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader className="relative h-64">
                {image && (
                    <Image
                    src={image.imageUrl}
                    alt={crop.name}
                    data-ai-hint={image.imageHint}
                    fill
                    className="object-cover rounded-t-lg"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-t-lg" />
                    <div className="absolute top-4 right-4 flex gap-2">
                        {crop.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="font-normal text-xs backdrop-blur-sm bg-background/70">
                            {tag}
                        </Badge>
                        ))}
                    </div>
                </CardHeader>
                <CardContent className="pt-6">
                    <p className="text-muted-foreground">{crop.description}</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl font-headline">
                        <CalendarDays className="w-5 h-5 text-primary" />
                        Calendario de Siembra y Cosecha
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                    <p className="text-muted-foreground text-sm mb-4 text-center">
                        Selecciona una fecha de siembra óptima (resaltada en verde) para ver la fecha estimada de cosecha.
                    </p>
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        fromDate={today}
                        locale={es}
                        modifiers={{
                            planting: isPlantingDay,
                            harvest: harvestDate ? [harvestDate] : [],
                        }}
                        modifiersClassNames={{
                            planting: 'bg-primary/10 text-primary-foreground',
                            harvest: 'bg-accent text-accent-foreground',
                        }}
                    />
                    {harvestDate && selectedDate && (
                         <div className="mt-4 text-center p-4 bg-muted rounded-lg">
                            <p className="font-semibold">
                                Si siembras el <span className="text-primary">{format(selectedDate, "d 'de' MMMM", { locale: es })}</span>,
                            </p>
                            <p className="font-semibold">
                                tu cosecha estimada será el <span className="text-accent">{format(harvestDate, "d 'de' MMMM, yyyy", { locale: es })}</span>.
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl font-headline">
                        <FlaskConical className="w-5 h-5 text-primary" />
                        Tiempos de Fertilización
                    </CardTitle>
                </CardHeader>
                <CardContent>
                     <Timeline>
                        {crop.fertilizationTimeline.map((item, index) => (
                            <TimelineItem key={item.stage}>
                                <TimelineConnector />
                                <TimelineHeader>
                                    <TimelineTitle>{item.stage} <span className="text-muted-foreground font-normal text-sm">({item.time})</span></TimelineTitle>
                                </TimelineHeader>
                                <TimelineContent>
                                    <p className="text-sm text-muted-foreground">{item.description}</p>
                                </TimelineContent>
                            </TimelineItem>
                        ))}
                    </Timeline>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl font-headline">
                        <Leaf className="w-5 h-5 text-primary" />
                        Buenas Prácticas Sostenibles
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground text-sm">{crop.sustainablePractices}</p>
                </CardContent>
            </Card>
        </div>

        <div className="lg:col-span-1 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl font-headline">
                        <CalendarIcon className="w-5 h-5 text-primary" />
                        Época de Siembra
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">{crop.plantingSeason}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl font-headline">Recomendaciones</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h4 className="font-semibold flex items-center gap-2 mb-1">
                            <Sun className="w-4 h-4 text-muted-foreground" />
                            Luz
                        </h4>
                        <p className="text-sm text-muted-foreground">{crop.recommendations.light}</p>
                    </div>
                     <Separator />
                    <div>
                        <h4 className="font-semibold flex items-center gap-2 mb-1">
                            <Droplets className="w-4 h-4 text-muted-foreground" />
                            Riego
                        </h4>
                        <p className="text-sm text-muted-foreground">{crop.recommendations.watering}</p>
                    </div>
                     <Separator />
                     <div>
                        <h4 className="font-semibold flex items-center gap-2 mb-1">
                            <div className="w-4 h-4 text-muted-foreground flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 17h20v2H2zM2 12h20v2H2zM2 7h20v2H2z"/></svg>
                            </div>
                            Suelo
                        </h4>
                        <p className="text-sm text-muted-foreground">{crop.recommendations.soil}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </>
  );
}

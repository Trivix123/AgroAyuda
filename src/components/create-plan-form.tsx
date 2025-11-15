'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { crops } from '@/lib/data';
import { generateCultivationPlan } from '@/app/actions';
import { useFormStatus } from 'react-dom';

const elSalvadorDepartments = [
  "Ahuachapán", "Cabañas", "Chalatenango", "Cuscatlán", "La Libertad", 
  "La Paz", "La Unión", "Morazán", "San Miguel", "San Salvador", 
  "San Vicente", "Santa Ana", "Sonsonate", "Usulután"
];

const formSchema = z.object({
  crop: z.enum(['café', 'caña', 'maíz', 'frijol', 'tomate', 'ayote', 'pepino', 'berenjena'], { required_error: 'Debes seleccionar un cultivo.' }),
  location: z.string().min(1, { message: 'Debes seleccionar una ubicación.' }),
  plantingDate: z.date({ required_error: 'La fecha de siembra es requerida.' }),
  userType: z.enum(['Productor agrícola', 'Huerto urbano'], { required_error: 'Debes seleccionar un tipo de usuario.' }),
});

type FormValues = z.infer<typeof formSchema>;

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
            {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            {pending ? 'Generando Plan...' : 'Generar Plan de Cultivo'}
        </Button>
    )
}

export function CreatePlanForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultCrop = searchParams.get('crop');
  const cropData = crops.find(c => c.slug === defaultCrop);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      crop: cropData?.name,
      location: '',
      userType: 'Productor agrícola',
    },
  });

  const onSubmit = async (data: FormValues) => {
    const formData = new FormData();
    formData.append('crop', data.crop);
    formData.append('location', data.location);
    formData.append('plantingDate', format(data.plantingDate, 'yyyy-MM-dd'));
    formData.append('userType', data.userType);
    
    await generateCultivationPlan(formData);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Detalles del Cultivo</CardTitle>
        <CardDescription>
          Proporciona la información para que nuestro asistente de IA genere tus recomendaciones.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form action={() => form.handleSubmit(onSubmit)()} className="space-y-6">
            <FormField
              control={form.control}
              name="crop"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cultivo</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un cultivo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {crops.map(c => (
                        <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ubicación</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un departamento" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {elSalvadorDepartments.map(dep => (
                        <SelectItem key={dep} value={dep}>{dep}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>Departamento o zona de El Salvador.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="plantingDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Fecha de siembra</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-full pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(field.value, 'PPP', { locale: es })
                          ) : (
                            <span>Elige una fecha</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date('1900-01-01')}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="userType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de usuario</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona tu perfil" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Productor agrícola">Productor agrícola</SelectItem>
                      <SelectItem value="Huerto urbano">Huerto urbano</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SubmitButton />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

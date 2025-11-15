'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Sprout } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email({ message: 'Por favor, introduce un correo válido.' }),
  password: z.string().min(1, { message: 'La contraseña no puede estar vacía.' }),
});

export default function LoginPage() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // In a real app, you would handle authentication here.
    // For this prototype, we'll navigate directly to the dashboard.
    router.push('/dashboard');
  }

  return (
    <>
      <div>
        <div className="flex items-center justify-center gap-2 mb-6">
          <Sprout className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold font-headline">Cosecha Inteligente</h1>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-center">Inicia sesión en tu cuenta</h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Planifica tus cultivos de forma sencilla y sostenible.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo electrónico</FormLabel>
                <FormControl>
                  <Input placeholder="tu@correo.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Contraseña</FormLabel>
                  <div className="text-sm">
                    <Link href="#" className="font-medium text-primary hover:underline">
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>
                </div>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            Iniciar sesión
          </Button>
        </form>
      </Form>
      <p className="mt-8 text-center text-sm text-muted-foreground">
        ¿No tienes una cuenta?{' '}
        <Link href="/register" className="font-medium text-primary hover:underline">
          Crear una cuenta
        </Link>
      </p>
    </>
  );
}

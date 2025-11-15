import Link from 'next/link';
import { PlusCircle, Leaf, CheckCircle, Clock } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { AppHeader } from '@/components/app-header';
import { StatCard } from '@/components/stat-card';
import { userPlans, UserPlan } from '@/lib/data';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

function PlanStatusBadge({ status }: { status: UserPlan['status'] }) {
  return (
    <Badge
      variant="outline"
      className={cn(
        'text-xs',
        status === 'Completado' && 'border-green-500 text-green-500',
        status === 'En progreso' && 'border-blue-500 text-blue-500',
        status === 'Planificado' && 'border-yellow-500 text-yellow-500'
      )}
    >
      {status === 'Completado' && <CheckCircle className="mr-1 h-3 w-3" />}
      {status === 'En progreso' && <Clock className="mr-1 h-3 w-3" />}
      {status === 'Planificado' && <Clock className="mr-1 h-3 w-3" />}
      {status}
    </Badge>
  );
}

export default function DashboardPage() {
  const userName = 'Juan'; // Mock user name
  const stats = {
    planned: userPlans.filter(p => p.status === 'Planificado').length,
    inProgress: userPlans.filter(p => p.status === 'En progreso').length,
    completed: userPlans.filter(p => p.status === 'Completado').length,
  };

  return (
    <>
      <AppHeader title={`Hola, ${userName}`} subtitle="Bienvenido a tu panel de control agrícola.">
        <Link href="/plans/create">
          <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <PlusCircle className="mr-2 h-4 w-4" />
            Crear Nuevo Plan
          </Button>
        </Link>
      </AppHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <StatCard
          title="Cultivos en Progreso"
          value={stats.inProgress.toString()}
          icon={<Leaf className="h-4 w-4 text-muted-foreground" />}
          description="Planes activos actualmente."
        />
        <StatCard
          title="Planes Futuros"
          value={stats.planned.toString()}
          icon={<Clock className="h-4 w-4 text-muted-foreground" />}
          description="Cultivos planificados por sembrar."
        />
        <StatCard
          title="Cosechas Completadas"
          value={stats.completed.toString()}
          icon={<CheckCircle className="h-4 w-4 text-muted-foreground" />}
          description="Ciclos de cultivo finalizados."
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Mis Planes de Cultivo</CardTitle>
          <CardDescription>
            Un resumen de todos tus planes de cultivo, pasados y presentes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cultivo</TableHead>
                <TableHead className="hidden md:table-cell">Ubicación</TableHead>
                <TableHead className="hidden sm:table-cell">Fecha de Siembra</TableHead>
                <TableHead className="hidden sm:table-cell">Cosecha Estimada</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userPlans.map(plan => (
                <TableRow key={plan.id}>
                  <TableCell className="font-medium">{plan.crop}</TableCell>
                  <TableCell className="hidden md:table-cell">{plan.location}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {format(new Date(plan.plantingDate), 'd MMM yyyy', { locale: es })}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                     {format(new Date(plan.harvestDate), 'd MMM yyyy', { locale: es })}
                  </TableCell>
                  <TableCell>
                    <PlanStatusBadge status={plan.status} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

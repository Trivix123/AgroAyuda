import { AppHeader } from "@/components/app-header";
import { StatCard } from "@/components/stat-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { crops } from "@/lib/data";
import { Edit, PlusCircle, Trash, Users, NotebookText } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AdminPage() {
  return (
    <>
      <AppHeader title="Panel de Administración" subtitle="Gestiona los datos de la aplicación." />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard
          title="Usuarios Registrados"
          value="1,245"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
          description="+20 esta semana"
        />
        <StatCard
          title="Planes Creados"
          value="4,890"
          icon={<NotebookText className="h-4 w-4 text-muted-foreground" />}
          description="+150 este mes"
        />
      </div>

       <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Gestión de Cultivos</CardTitle>
                <CardDescription>
                    Añade o edita la información técnica de los cultivos.
                </CardDescription>
            </div>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Agregar Cultivo
            </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cultivo</TableHead>
                <TableHead className="hidden md:table-cell">Tags</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {crops.map(crop => (
                <TableRow key={crop.id}>
                  <TableCell className="font-medium flex items-center gap-3">
                    <crop.icon className="h-5 w-5 text-muted-foreground" />
                    <span className="capitalize">{crop.name}</span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex gap-1">
                      {crop.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon">
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Editar</span>
                      </Button>
                       <Button variant="destructive" size="icon">
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Eliminar</span>
                      </Button>
                    </div>
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

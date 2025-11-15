import { AppHeader } from "@/components/app-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import placeholderImages from '@/lib/placeholder-images.json';
import { LogOut } from "lucide-react";

export default function ProfilePage() {
  const user = { name: 'Juan Pérez', email: 'juan.perez@example.com', userType: 'Productor agrícola' };
  const userAvatar = placeholderImages.placeholderImages.find(p => p.id === 'user-avatar');

  return (
    <>
      <AppHeader
        title="Perfil de Usuario"
        subtitle="Gestiona tu información personal y la configuración de tu cuenta."
      />

      <div className="max-w-3xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Información Personal</CardTitle>
            <CardDescription>Estos datos se muestran públicamente en tu perfil.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt={user.name} />}
                <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <Button variant="outline">Cambiar foto</Button>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" defaultValue={user.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input id="email" type="email" defaultValue={user.email} />
            </div>
            <div className="space-y-2">
                <Label htmlFor="userType">Tipo de usuario</Label>
                <Input id="userType" defaultValue={user.userType} disabled />
            </div>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Cambiar Contraseña</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="current-password">Contraseña Actual</Label>
                    <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="new-password">Nueva Contraseña</Label>
                    <Input id="new-password" type="password" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirmar Nueva Contraseña</Label>
                    <Input id="confirm-password" type="password" />
                </div>
                <Button>Actualizar Contraseña</Button>
            </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>Seguridad de la Cuenta</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                        <h4 className="font-semibold">Autenticación en dos pasos (MFA)</h4>
                        <p className="text-sm text-muted-foreground">
                            Añade una capa extra de seguridad a tu cuenta.
                        </p>
                    </div>
                    <Switch />
                </div>
            </CardContent>
        </Card>
        
        <Separator />

        <div className="flex justify-end">
            <Button variant="destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Cerrar Sesión
            </Button>
        </div>
      </div>
    </>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Sprout, Leaf, User, LogOut, ShieldCheck, Bot, NotebookText } from 'lucide-react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from './ui/separator';
import placeholderImages from '@/lib/placeholder-images.json';

const navItems = [
  { href: '/dashboard', icon: Home, label: 'Inicio' },
  { href: '/crops', icon: Leaf, label: 'Catálogo de Cultivos' },
  { href: '/plans/create', icon: Bot, label: 'Asistente IA' },
];

const bottomNavItems = [
  { href: '/profile', icon: User, label: 'Perfil' },
  { href: '/admin', icon: ShieldCheck, label: 'Admin' }, // Conditional
];

export function AppSidebar() {
  const pathname = usePathname();
  const user = { name: 'Juan Pérez', email: 'juan.perez@example.com', role: 'admin' }; // Mock user
  const userAvatar = placeholderImages.placeholderImages.find(p => p.id === 'user-avatar');

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/dashboard" className="flex items-center gap-2">
          <Sprout className="w-6 h-6 text-primary" />
          <h2 className="text-lg font-semibold font-headline text-primary-600 group-data-[collapsible=icon]:hidden">
            Cosecha Inteligente
          </h2>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {navItems.map(item => (
            <SidebarMenuItem key={item.label}>
              <Link href={item.href} passHref>
                <SidebarMenuButton
                  asChild
                  isActive={
                    item.href === '/dashboard'
                      ? pathname === item.href
                      : pathname.startsWith(item.href)
                  }
                  tooltip={item.label}
                >
                  <span>
                    <item.icon />
                    <span>{item.label}</span>
                  </span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2 gap-2">
        <Separator className="my-1" />
        <SidebarMenu>
          {bottomNavItems.map(item => {
            if (item.href === '/admin' && user.role !== 'admin') {
              return null;
            }
            return (
              <SidebarMenuItem key={item.label}>
                <Link href={item.href} passHref>
                  <SidebarMenuButton asChild isActive={pathname.startsWith(item.href)} tooltip={item.label}>
                    <span>
                      <item.icon />
                      <span>{item.label}</span>
                    </span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            );
          })}
          <SidebarMenuItem>
            <Link href="/login" passHref>
              <SidebarMenuButton asChild tooltip="Cerrar Sesión">
                <span>
                  <LogOut />
                  <span>Cerrar Sesión</span>
                </span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
        <Separator className="my-1" />
        <div className="flex items-center gap-3 p-2 rounded-md hover:bg-sidebar-accent transition-colors">
          <Avatar className="w-9 h-9">
            {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt={user.name} />}
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="overflow-hidden group-data-[collapsible=icon]:hidden">
            <p className="font-semibold text-sm truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

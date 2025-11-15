import { AppHeader } from '@/components/app-header';
import { CropCard } from '@/components/crop-card';
import { Input } from '@/components/ui/input';
import { crops } from '@/lib/data';
import { Search } from 'lucide-react';

export default function CropsPage() {
  return (
    <>
      <AppHeader
        title="Catálogo de Cultivos"
        subtitle="Explora los cultivos que puedes planificar en El Salvador."
      />
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Buscar cultivo..." className="pl-10" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {crops.map(crop => (
          <CropCard key={crop.id} crop={crop} />
        ))}
      </div>
    </>
  );
}

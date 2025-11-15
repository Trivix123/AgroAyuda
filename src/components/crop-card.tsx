import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Crop } from '@/lib/data';
import placeholderImages from '@/lib/placeholder-images.json';

type CropCardProps = {
  crop: Crop;
};

export function CropCard({ crop }: CropCardProps) {
  const Icon = crop.icon;
  const image = placeholderImages.placeholderImages.find(p => p.id === crop.image);

  return (
    <Link href={`/crops/${crop.slug}`} className="block group">
      <Card className="hover:shadow-lg transition-all duration-300 h-full flex flex-col">
        <CardHeader className="relative h-40">
          {image && (
            <Image
              src={image.imageUrl}
              alt={crop.name}
              data-ai-hint={image.imageHint}
              fill
              className="object-cover rounded-t-lg"
            />
          )}
           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-t-lg" />
           <div className="absolute bottom-4 left-6 right-6">
             <CardTitle className="text-2xl font-headline text-white">{crop.name}</CardTitle>
           </div>
           <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm p-2 rounded-full">
            <Icon className="w-6 h-6 text-primary" />
           </div>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col justify-between pt-4">
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{crop.description}</p>
          <div className="flex flex-wrap gap-2">
            {crop.tags.map(tag => (
              <Badge key={tag} variant="secondary" className="font-normal">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

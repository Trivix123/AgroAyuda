import { Coffee, Bean } from 'lucide-react';
import { CornIcon } from '@/components/icons/corn-icon';
import { SugarcaneIcon } from '@/components/icons/sugarcane-icon';
import { TomatoIcon } from '@/components/icons/tomato-icon';
import { CucumberIcon } from '@/components/icons/cucumber-icon';
import { EggplantIcon } from '@/components/icons/eggplant-icon';
import { SquashIcon } from '@/components/icons/squash-icon';

export type Crop = {
  id: string;
  name: 'café' | 'caña' | 'maíz' | 'frijol' | 'tomate' | 'ayote' | 'pepino' | 'berenjena';
  slug: string;
  icon: React.ComponentType<{ className?: string }>;
  tags: string[];
  image: string;
  description: string;
  plantingSeason: string;
  optimalPlantingMonths: number[]; // 0 = Enero, 1 = Febrero, etc.
  daysToHarvest: number;
  recommendations: {
    soil: string;
    light: string;
    watering: string;
  };
  fertilizationTimeline: {
    stage: string;
    time: string;
    description: string;
  }[];
  sustainablePractices: string;
};

export const crops: Crop[] = [
  {
    id: '1',
    name: 'café',
    slug: 'cafe',
    icon: Coffee,
    image: 'cafe-image',
    tags: ['Requiere riego medio', 'Ciclo largo'],
    description:
      'El café es uno de los cultivos más importantes de El Salvador, conocido por su alta calidad y sabor distintivo. Requiere condiciones específicas de altitud y clima para prosperar.',
    plantingSeason: 'La siembra se realiza generalmente al inicio de la estación lluviosa, entre mayo y junio.',
    optimalPlantingMonths: [4, 5], // Mayo, Junio
    daysToHarvest: 270,
    recommendations: {
      soil: 'Suelos francos, profundos, ricos en materia orgánica y con buen drenaje. pH ideal entre 5.5 y 6.5.',
      light: 'Prefiere sombra parcial, especialmente en sus primeras etapas. Se cultiva tradicionalmente bajo árboles de sombra.',
      watering: 'Riego regular durante la época seca, evitando el encharcamiento. El sistema de goteo es ideal.',
    },
    fertilizationTimeline: [
      {
        stage: 'Crecimiento',
        time: 'Anual',
        description: 'Aplicar fertilizantes ricos en nitrógeno para promover el crecimiento vegetativo.',
      },
      {
        stage: 'Floración y Fructificación',
        time: 'Pre-floración',
        description: 'Usar fórmulas ricas en fósforo y potasio para estimular la producción de flores y frutos.',
      },
    ],
    sustainablePractices:
      'Fomentar el uso de sombra con árboles nativos (ODS 15), manejar de forma integrada las plagas y enfermedades para reducir el uso de químicos (ODS 12), y conservar el suelo mediante curvas a nivel (ODS 13).',
  },
  {
    id: '2',
    name: 'caña',
    slug: 'cana-de-azucar',
    icon: SugarcaneIcon,
    image: 'cana-image',
    tags: ['Requiere riego alto', 'Ciclo mediano'],
    description:
      'La caña de azúcar es un cultivo fundamental para la producción de azúcar y etanol. Es una planta robusta que se adapta bien a las zonas cálidas y bajas del país.',
    plantingSeason: 'Puede sembrarse durante gran parte del año, pero es común hacerlo entre noviembre y enero para aprovechar la humedad residual.',
    optimalPlantingMonths: [10, 11, 0], // Noviembre, Diciembre, Enero
    daysToHarvest: 365,
    recommendations: {
      soil: 'Suelos pesados con buena retención de humedad, como los franco-arcillosos. Tolera un rango amplio de pH.',
      light: 'Requiere exposición a pleno sol para maximizar la producción de azúcares.',
      watering: 'Necesita abundante agua, especialmente durante su fase de crecimiento activo. El riego por surcos o aspersión es común.',
    },
    fertilizationTimeline: [
      {
        stage: 'Macollamiento',
        time: '45-60 días',
        description: 'Aplicación de nitrógeno para estimular el desarrollo de tallos.',
      },
      {
        stage: 'Gran Crecimiento',
        time: '3-6 meses',
        description: 'Fertilización balanceada (NPK) para soportar el rápido crecimiento de la planta.',
      },
    ],
    sustainablePractices:
      'Utilizar el bagazo como fuente de energía renovable (ODS 7), practicar la rotación de cultivos para mantener la salud del suelo y reducir la quema antes de la cosecha para disminuir la contaminación del aire (ODS 13).',
  },
  {
    id: '3',
    name: 'maíz',
    slug: 'maiz',
    icon: CornIcon,
    image: 'maiz-image',
    tags: ['Requiere riego medio', 'Ciclo corto'],
    description:
      'El maíz es la base de la alimentación en El Salvador y un cultivo de gran importancia cultural y económica. Se cultiva en todo el país en diferentes épocas.',
    plantingSeason: 'Siembra de "primera" en mayo-junio y siembra de "postrera" en agosto-septiembre.',
    optimalPlantingMonths: [4, 5, 7, 8], // Mayo, Junio, Agosto, Septiembre
    daysToHarvest: 90,
    recommendations: {
      soil: 'Suelos bien drenados, fértiles y ricos en materia orgánica. pH entre 6.0 y 7.0.',
      light: 'Necesita pleno sol para un desarrollo óptimo y una buena polinización.',
      watering: 'Riego crucial durante la germinación, floración y llenado de grano. La falta de agua en estas etapas afecta el rendimiento.',
    },
    fertilizationTimeline: [
      {
        stage: 'Siembra',
        time: 'Día 0',
        description: 'Aplicar una base de fósforo para un buen desarrollo de raíces.',
      },
      {
        stage: 'V4-V6 (4-6 hojas)',
        time: '25-30 días',
        description: 'Segunda dosis de nitrógeno para impulsar el crecimiento vegetativo.',
      },
    ],
    sustainablePractices:
      'Practicar la siembra directa y la asociación con frijol (milpa) para mejorar la fertilidad del suelo (ODS 2). Utilizar variedades criollas adaptadas localmente para conservar la biodiversidad (ODS 15).',
  },
  {
    id: '4',
    name: 'frijol',
    slug: 'frijol',
    icon: Bean,
    image: 'frijol-image',
    tags: ['Requiere riego bajo', 'Ciclo corto'],
    description:
      'El frijol es una fuente esencial de proteína en la dieta salvadoreña. Es un cultivo de ciclo corto que fija nitrógeno en el suelo, mejorando su fertilidad.',
    plantingSeason: 'Generalmente se siembra en asociación con el maíz en las siembras de primera y postrera.',
    optimalPlantingMonths: [4, 5, 7, 8], // Mayo, Junio, Agosto, Septiembre
    daysToHarvest: 75,
    recommendations: {
      soil: 'Prefiere suelos ligeros y bien drenados. No tolera el exceso de humedad.',
      light: 'Requiere buena exposición solar, aunque tolera algo de sombra en sistemas de asocio.',
      watering: 'Riego moderado. Es relativamente resistente a la sequía, pero el agua es clave durante la floración.',
    },
    fertilizationTimeline: [
      {
        stage: 'Siembra',
        time: 'Día 0',
        description:
          'No requiere mucho nitrógeno, pero responde bien al fósforo y potasio para el desarrollo de raíces y vainas.',
      },
    ],
    sustainablePractices:
      'Asociarlo con maíz en el sistema milpa para un uso eficiente de la tierra y la fijación de nitrógeno (ODS 2). Rotar cultivos para romper ciclos de plagas y enfermedades (ODS 12).',
  },
  {
    id: '5',
    name: 'tomate',
    slug: 'tomate',
    icon: TomatoIcon,
    image: 'tomate-image',
    tags: ['Requiere riego alto', 'Ciclo mediano'],
    description:
      'El tomate es una hortaliza muy popular, cultivada tanto por productores agrícolas como en huertos urbanos. Requiere cuidados constantes para una buena cosecha.',
    plantingSeason: 'Se puede cultivar todo el año en condiciones controladas (invernadero) o en la época seca (noviembre-abril) al aire libre.',
    optimalPlantingMonths: [0, 1, 2, 3, 10, 11], // Ene, Feb, Mar, Abr, Nov, Dic
    daysToHarvest: 90,
    recommendations: {
      soil: 'Suelos sueltos, profundos y ricos en materia orgánica, con excelente drenaje. pH ideal de 6.0-6.8.',
      light: 'Necesita al menos 6-8 horas de sol directo al día.',
      watering: 'Riego frecuente y constante, preferiblemente por goteo para evitar mojar las hojas y prevenir enfermedades.',
    },
    fertilizationTimeline: [
      {
        stage: 'Transplante',
        time: 'Semana 1',
        description: 'Fertilizante rico en fósforo para el establecimiento de raíces.',
      },
      {
        stage: 'Crecimiento y Floración',
        time: 'Semana 4 en adelante',
        description: 'Fertilización balanceada regular, con mayor aporte de potasio durante la formación del fruto.',
      },
    ],
    sustainablePractices:
      'Usar tutores para guiar el crecimiento, mejorar la aireación y facilitar la cosecha. Implementar el manejo integrado de plagas y utilizar abonos orgánicos como el compost (ODS 12).',
  },
  {
    id: '6',
    name: 'ayote',
    slug: 'ayote',
    icon: SquashIcon,
    image: 'ayote-image',
    tags: ['Requiere riego medio', 'Ciclo mediano'],
    description:
      'El ayote (calabaza) es una planta rastrera o trepadora muy productiva. Sus frutos, flores y guías son comestibles. Es un cultivo tradicional en la milpa.',
    plantingSeason: 'Se siembra comúnmente en la época lluviosa (mayo-agosto).',
    optimalPlantingMonths: [4, 5, 6, 7], // Mayo, Junio, Julio, Agosto
    daysToHarvest: 80,
    recommendations: {
      soil: 'Suelos fértiles y bien drenados. Crece bien en los bordes de la milpa o en montículos de compost.',
      light: 'Requiere pleno sol para un buen desarrollo de frutos.',
      watering: 'Riego regular, especialmente durante la floración y el desarrollo del fruto. Evitar mojar las hojas.',
    },
    fertilizationTimeline: [
      {
        stage: 'Siembra',
        time: 'Día 0',
        description: 'Incorporar abundante materia orgánica o compost en el sitio de siembra.',
      },
      {
        stage: 'Inicio de guías',
        time: '30 días',
        description: 'Puede aplicarse un abono balanceado si el suelo es pobre.',
      },
    ],
    sustainablePractices:
      'Plantar en asocio con maíz y frijol. Usar sus grandes hojas como cobertura natural del suelo para conservar la humedad y controlar malezas (ODS 15). Aprovechar integralmente la planta (fruto, flor, guía) para reducir el desperdicio (ODS 12).',
  },
  {
    id: '7',
    name: 'pepino',
    slug: 'pepino',
    icon: CucumberIcon,
    image: 'pepino-image',
    tags: ['Requiere riego alto', 'Ciclo corto'],
    description:
      'El pepino es una hortaliza refrescante de crecimiento rápido. Se adapta bien al cultivo en espalderas o tutores, lo que lo hace ideal para huertos urbanos y productores.',
    plantingSeason: 'Mejor en la época seca con riego (noviembre-abril) para evitar enfermedades fúngicas.',
    optimalPlantingMonths: [0, 1, 2, 3, 10, 11], // Ene, Feb, Mar, Abr, Nov, Dic
    daysToHarvest: 60,
    recommendations: {
      soil: 'Suelos ricos en materia orgánica, sueltos y con buen drenaje.',
      light: 'Necesita pleno sol.',
      watering: 'Riego constante y abundante, especialmente durante la formación de frutos. El sistema de goteo es muy recomendable.',
    },
    fertilizationTimeline: [
      {
        stage: 'Crecimiento',
        time: 'Cada 2 semanas',
        description: 'Aplicar un fertilizante líquido balanceado para sostener su rápido crecimiento y producción.',
      },
    ],
    sustainablePractices:
      'Cultivar en vertical usando tutores o mallas para ahorrar espacio, mejorar la ventilación y la calidad del fruto. Fomentar la presencia de polinizadores como las abejas (ODS 15).',
  },
  {
    id: '8',
    name: 'berenjena',
    slug: 'berenjena',
    icon: EggplantIcon,
    image: 'berenjena-image',
    tags: ['Requiere riego medio', 'Ciclo mediano'],
    description:
      'La berenjena es una hortaliza de clima cálido que produce frutos de un característico color morado. Es versátil en la cocina y nutritiva.',
    plantingSeason: 'Ideal para la época seca con riego, ya que es sensible a la alta humedad ambiental.',
    optimalPlantingMonths: [0, 1, 2, 3, 10, 11], // Ene, Feb, Mar, Abr, Nov, Dic
    daysToHarvest: 80,
    recommendations: {
      soil: 'Suelos profundos, fértiles y bien drenados. pH ligeramente ácido a neutro.',
      light: 'Requiere muchas horas de sol directo para una buena producción.',
      watering: 'Riego regular para mantener el suelo uniformemente húmedo, pero sin encharcamientos.',
    },
    fertilizationTimeline: [
      {
        stage: 'Transplante',
        time: 'Semana 1',
        description: 'Abono rico en fósforo para el desarrollo radicular.',
      },
      {
        stage: 'Producción',
        time: 'Cada 3-4 semanas',
        description: 'Aplicar fertilizantes ricos en potasio para mejorar la calidad y cantidad de los frutos.',
      },
    ],
    sustainablePractices:
      'Realizar podas de formación para mejorar la estructura de la planta y la producción. Utilizar acolchado (mulch) para conservar la humedad del suelo y controlar malezas (ODS 12).',
  },
];

export const userPlans = [
    {
      id: 'plan-1',
      crop: 'Maíz',
      location: 'Chalatenango',
      plantingDate: '2024-05-15',
      status: 'En progreso',
      harvestDate: '2024-08-23',
    },
    {
      id: 'plan-2',
      crop: 'Tomate',
      location: 'Huerto Urbano, San Salvador',
      plantingDate: '2024-11-20',
      status: 'Planificado',
      harvestDate: '2025-02-18',
    },
    {
      id: 'plan-3',
      crop: 'Frijol',
      location: 'Santa Ana',
      plantingDate: '2024-08-25',
      status: 'Planificado',
      harvestDate: '2024-11-03',
    },
      {
      id: 'plan-4',
      crop: 'Café',
      location: 'Apaneca',
      plantingDate: '2023-06-01',
      status: 'Completado',
      harvestDate: '2024-01-15',
    },
];

export type UserPlan = (typeof userPlans)[0];

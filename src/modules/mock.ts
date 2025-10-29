// Для типов используем type-only импорты
import type { 
  HarvestResource, 
  HarvestApplicationResource, 
  HarvestApplicationInfo,
} from './harvestApi';



export const HARVEST_RESOURCES_MOCK: HarvestResource[] = [
  {
    id: 1,
    name: "Органические удобрения",
    description: "Высококачественные органические удобрения для теплиц",
    detailed_description: "Натуральные органические удобрения, способствующие здоровому росту растений и повышению урожайности. Без химических добавок.",
    image_url: "http://127.0.0.1:9000/lab1/fertilizer.jpg",
    tariff: "150 руб/кг",
    tariff_cost: 150,
    measurement: "кг",
    requirement: 0.5,
    created_at: "2024-01-01",
    deleted_at: null,
    is_deleted: false,
  },
  {
    id: 2,
    name: "Система капельного полива",
    description: "Автоматическая система полива для теплиц",
    detailed_description: "Эффективная система капельного полива с автоматическим контролем влажности почвы. Экономит воду до 50%.",
    image_url: "http://127.0.0.1:9000/lab1/irrigation.jpg",
    tariff: "500 руб/м²",
    tariff_cost: 500,
    measurement: "м²",
    requirement: 0.3,
    created_at: "2024-01-01",
    deleted_at: null,
    is_deleted: false,
  },
  {
    id: 3,
    name: "Биозащита растений",
    description: "Экологичные средства защиты от вредителей",
    detailed_description: "Биологические средства защиты растений от распространенных вредителей. Безопасно для человека и окружающей среды.",
    image_url: "http://127.0.0.1:9000/lab1/bioprotection.jpg",
    tariff: "200 руб/л",
    tariff_cost: 200,
    measurement: "л",
    requirement: 0.2,
    created_at: "2024-01-01",
    deleted_at: null,
    is_deleted: false,
  },
];

export const HARVEST_APPLICATION_MOCK: HarvestApplicationResource[] = [
  {
    resource_id: 1,
    resource_name: "Органические удобрения",
    resource_image_url: "http://127.0.0.1:9000/lab1/fertilizer.jpg",
    resource_tariff: "150 руб/кг",
    resource_tariff_cost: 150,
    resource_measurement: "кг",
    ratio: 1.0,
    needed_amount: 50,
    total_cost: 7500,
  },
];

export const HARVEST_APPLICATION_INFO_MOCK: HarvestApplicationInfo = {
  productivity: 10,
  weight: 500,
};
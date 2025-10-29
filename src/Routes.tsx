export const ROUTES = {
  HOME: "/",
  HARVEST_RESOURCES: "/harvestResources",
  HARVEST_APPLICATION: "/harvestApplication",
  HARVEST_DETAILED_RESOURCE: "/harvestDetailedResource",
};

export type RouteKeyType = keyof typeof ROUTES;

export const ROUTE_LABELS: { [key in RouteKeyType]: string } = {
  HOME: "Главная",
  HARVEST_RESOURCES: "Ресурсы урожая",
  HARVEST_APPLICATION: "Оформление заявки",
  HARVEST_DETAILED_RESOURCE: "Детальная информация о ресурсе",
};
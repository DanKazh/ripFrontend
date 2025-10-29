// Интерфейсы и типы на основе ваших Go структур
export interface HarvestResource {
  id: number;
  name: string;
  tariff: string;
  tariff_cost: number;
  measurement: string;
  description: string;
  detailed_description: string;
  image_url: string;
  is_deleted: boolean;
  created_at: string;
  deleted_at: string | null;
  requirement: number;
}

export interface ApplicationResource {
  application_id: number;
  resource_id: number;
  ratio: number;
  needed_amount: number;
  total_cost: number;
  resource: HarvestResource;
}

export interface HarvestApplication {
  id: number;
  status: string;
  creator_id: number;
  created_at: string;
  formation_date: string | null;
  completion_date: string | null;
  moderator_id: number | null;
  productivity: number | null;
  weight: number | null;
  full_cost: number | null;
  notes: string | null;
  resources: ApplicationResource[];
}

export interface HarvestApplicationInfo {
  productivity: number;
  weight: number;
}

// Для React компонентов используем упрощенную структуру
export interface HarvestApplicationResource {
  resource_id: number;
  resource_name: string;
  resource_image_url: string;
  resource_tariff: string;
  resource_tariff_cost: number;
  resource_measurement: string;
  ratio: number;
  needed_amount: number;
  total_cost: number;
}

// Request types based on your Go structures
export interface AddResourceRequest {
  resource_id: number;
}

export interface SetApplicationChangesRequest {
  productivity: number;
  weight: number;
}

export interface DeclineApplicationRequest {
  moderator_id: number;
  notes: string;
}

export interface DeleteApplicationResourceRequest {
  application_id: number;
}

export interface SetApplicationResourceCoeffRequest {
  application_id: number;
  coefficient: number;
}

export interface SetResourceImageRequest {
  image_url: string;
}

export interface StandardResponse {
  message: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  role?: string;
}

export interface UpdateUserRequest {
  username?: string;
  role?: string;
}

// API функции с реальными эндпоинтами из вашего Swagger
const API_BASE = "/api";

// Добавляем функцию для получения токена (если используется аутентификация)
const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

// Добавляем общие заголовки
const getHeaders = (): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

// Обработчик ошибок
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`HTTP ${response.status}: ${error}`);
  }
  return response.json();
};

export const getHarvestResources = async (query = ""): Promise<HarvestResource[]> => {
  try {
    const url = query 
      ? `/api/harvestResources?harvestQuery=${encodeURIComponent(query)}`
      : `/api/harvestResources`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    console.log('API Response:', data); // Для отладки
    
    // Извлекаем массив ресурсов из data.data.resources
    if (data && data.data && Array.isArray(data.data.resources)) {
      return data.data.resources;
    } else if (Array.isArray(data)) {
      return data;
    } else if (data && Array.isArray(data.resources)) {
      return data.resources;
    } else {
      console.warn('Непредвиденный формат ответа:', data);
      return [];
    }
  } catch (error) {
    console.error('Ошибка API:', error);
    return [];
  }
};

export const getHarvestDetailedResource = async (id: number): Promise<HarvestResource> => {
  try {
    const response = await fetch(`${API_BASE}/harvestDetailedResource/${id}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    console.log('Detailed Resource API Response:', data); // Для отладки
    
    // Извлекаем ресурс из data.data
    if (data && data.data) {
      return data.data;
    } else if (data.id) {
      return data;
    } else {
      console.warn('Неизвестная структура ответа для детального ресурса:', data);
      throw new Error('Неверный формат ответа от сервера');
    }
  } catch (error) {
    console.error('Ошибка загрузки детального ресурса:', error);
    throw error;
  }
};

export const getHarvestApplication = async (id: number): Promise<{
  application: HarvestApplicationResource[];
  info: HarvestApplicationInfo;
  total_cost: number;
}> => {
  const response = await fetch(`${API_BASE}/harvestApplication/${id}`, {
    headers: getHeaders(),
  });
  
  return handleResponse(response);
};

export const addResourceToApplication = async (applicationId: number, resourceId: number): Promise<StandardResponse> => {
  const response = await fetch(`${API_BASE}/harvestApplication/${applicationId}/addResource`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ resource_id: resourceId }),
  });
  
  return handleResponse(response);
};

export const setApplicationChanges = async (applicationId: number, changes: SetApplicationChangesRequest): Promise<StandardResponse> => {
  const response = await fetch(`${API_BASE}/harvestApplication/${applicationId}/setChanges`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(changes),
  });
  
  return handleResponse(response);
};

export const saveApplication = async (applicationId: number): Promise<StandardResponse> => {
  const response = await fetch(`${API_BASE}/harvestApplication/${applicationId}/form`, {
    method: "POST",
    headers: getHeaders(),
  });
  
  return handleResponse(response);
};

export const deleteApplication = async (applicationId: number): Promise<StandardResponse> => {
  const response = await fetch(`${API_BASE}/harvestApplication/${applicationId}/delete`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  
  return handleResponse(response);
};

// Дополнительные функции из вашего API
export const setApplicationResourceCoeff = async (resourceId: number, applicationId: number, coefficient: number): Promise<StandardResponse> => {
  const response = await fetch(`${API_BASE}/applicationResource/${resourceId}/setCoeff`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({ 
      application_id: applicationId,
      coefficient: coefficient 
    }),
  });
  
  return handleResponse(response);
};

export const deleteApplicationResource = async (resourceId: number, applicationId: number): Promise<StandardResponse> => {
  const response = await fetch(`${API_BASE}/applicationResource/${resourceId}/deleteResource`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify({ 
      application_id: applicationId
    }),
  });
  
  return handleResponse(response);
};
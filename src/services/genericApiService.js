import { apiHandler } from '@/lib/apiWrapper';
import { HTTP_METHODS } from '@/constants';

class GenericApiService {
  constructor(baseEndpoint) {
    this.baseEndpoint = baseEndpoint;
  }

  // Generic CRUD operations
  async getAll(params = {}) {
    return await apiHandler(this.baseEndpoint, {
      method: HTTP_METHODS.GET,
      params,
    });
  }

  async getById(id) {
    return await apiHandler(`${this.baseEndpoint}/${id}`, {
      method: HTTP_METHODS.GET,
    });
  }

  async create(data) {
    return await apiHandler(this.baseEndpoint, {
      method: HTTP_METHODS.POST,
      data,
    });
  }

  async update(id, data) {
    return await apiHandler(`${this.baseEndpoint}/${id}`, {
      method: HTTP_METHODS.PUT,
      data,
    });
  }

  async delete(id) {
    return await apiHandler(`${this.baseEndpoint}/${id}`, {
      method: HTTP_METHODS.DELETE,
    });
  }

  async patch(id, data) {
    return await apiHandler(`${this.baseEndpoint}/${id}`, {
      method: HTTP_METHODS.PATCH,
      data,
    });
  }

  // Search and filter
  async search(query, params = {}) {
    return await apiHandler(`${this.baseEndpoint}/search`, {
      method: HTTP_METHODS.GET,
      params: { q: query, ...params },
    });
  }

  async filter(filters) {
    return await apiHandler(`${this.baseEndpoint}/filter`, {
      method: HTTP_METHODS.GET,
      params: filters,
    });
  }

  // Bulk operations
  async bulkCreate(data) {
    return await apiHandler(`${this.baseEndpoint}/bulk`, {
      method: HTTP_METHODS.POST,
      data,
    });
  }

  async bulkUpdate(data) {
    return await apiHandler(`${this.baseEndpoint}/bulk`, {
      method: HTTP_METHODS.PUT,
      data,
    });
  }

  async bulkDelete(ids) {
    return await apiHandler(`${this.baseEndpoint}/bulk`, {
      method: HTTP_METHODS.DELETE,
      data: { ids },
    });
  }

  // Export operations
  async export(format = 'csv', params = {}) {
    return await apiHandler(`${this.baseEndpoint}/export`, {
      method: HTTP_METHODS.GET,
      params: { format, ...params },
    });
  }

  // Statistics and analytics
  async getStats(params = {}) {
    return await apiHandler(`${this.baseEndpoint}/stats`, {
      method: HTTP_METHODS.GET,
      params,
    });
  }

  // Custom endpoint
  async customEndpoint(endpoint, method = HTTP_METHODS.GET, data = null, params = {}) {
    return await apiHandler(`${this.baseEndpoint}${endpoint}`, {
      method,
      data,
      params,
    });
  }
}

// Create specific service instances
export const userService = new GenericApiService('/api/users');
export const itemService = new GenericApiService('/api/items');
export const roleService = new GenericApiService('/api/roles');
export const permissionService = new GenericApiService('/api/permissions');
export const notificationService = new GenericApiService('/api/notifications');
export const reportService = new GenericApiService('/api/reports');
export const auditService = new GenericApiService('/api/audit');

// Generic service factory
export const createApiService = (baseEndpoint) => {
  return new GenericApiService(baseEndpoint);
};

export default GenericApiService;

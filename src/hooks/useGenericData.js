import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

export const useGenericData = ({
  service,
  selector,
  action,
  dependencies = [],
  autoFetch = true,
  onSuccess,
  onError,
}) => {
  const dispatch = useDispatch();
  const data = useSelector(selector);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async (params = {}) => {
    if (!service) return;

    setLoading(true);
    setError(null);

    try {
      const response = await service.getAll(params);
      
      if (response.success) {
        if (action) {
          dispatch(action(response.data));
        }
        if (onSuccess) {
          onSuccess(response.data);
        }
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to fetch data');
      }
    } catch (err) {
      const errorMessage = err.message || 'An error occurred while fetching data';
      setError(errorMessage);
      if (onError) {
        onError(err);
      } else {
        toast.error(errorMessage);
      }
      throw err;
    } finally {
      setLoading(false);
    }
  }, [service, action, dispatch, onSuccess, onError]);

  const createItem = useCallback(async (itemData) => {
    if (!service) return;

    setLoading(true);
    setError(null);

    try {
      const response = await service.create(itemData);
      
      if (response.success) {
        toast.success('Item created successfully');
        if (autoFetch) {
          await fetchData();
        }
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to create item');
      }
    } catch (err) {
      const errorMessage = err.message || 'An error occurred while creating item';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [service, autoFetch, fetchData]);

  const updateItem = useCallback(async (id, itemData) => {
    if (!service) return;

    setLoading(true);
    setError(null);

    try {
      const response = await service.update(id, itemData);
      
      if (response.success) {
        toast.success('Item updated successfully');
        if (autoFetch) {
          await fetchData();
        }
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to update item');
      }
    } catch (err) {
      const errorMessage = err.message || 'An error occurred while updating item';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [service, autoFetch, fetchData]);

  const deleteItem = useCallback(async (id) => {
    if (!service) return;

    setLoading(true);
    setError(null);

    try {
      const response = await service.delete(id);
      
      if (response.success) {
        toast.success('Item deleted successfully');
        if (autoFetch) {
          await fetchData();
        }
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to delete item');
      }
    } catch (err) {
      const errorMessage = err.message || 'An error occurred while deleting item';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [service, autoFetch, fetchData]);

  const searchItems = useCallback(async (query, params = {}) => {
    if (!service) return;

    setLoading(true);
    setError(null);

    try {
      const response = await service.search(query, params);
      
      if (response.success) {
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to search items');
      }
    } catch (err) {
      const errorMessage = err.message || 'An error occurred while searching';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [service]);

  const exportData = useCallback(async (format = 'csv', params = {}) => {
    if (!service) return;

    setLoading(true);
    setError(null);

    try {
      const response = await service.export(format, params);
      
      if (response.success) {
        // Handle file download
        const blob = new Blob([response.data], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `export.${format}`;
        link.click();
        window.URL.revokeObjectURL(url);
        
        toast.success('Data exported successfully');
        return response.data;
      } else {
        throw new Error(response.message || 'Failed to export data');
      }
    } catch (err) {
      const errorMessage = err.message || 'An error occurred while exporting data';
      setError(errorMessage);
      toast.error(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [service]);

  // Auto-fetch on mount and when dependencies change
  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [autoFetch, fetchData, ...dependencies]);

  return {
    data,
    loading,
    error,
    fetchData,
    createItem,
    updateItem,
    deleteItem,
    searchItems,
    exportData,
    refetch: fetchData,
  };
};

export default useGenericData;

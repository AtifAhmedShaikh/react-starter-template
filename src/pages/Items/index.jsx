import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '@/hooks/useModal';
import GenericTable from '@/components/reuseable/GenericTable';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { useGenericData } from '@/hooks/useGenericData';
import { itemService } from '@/services/genericApiService';

const Items = () => {
  const { openConfirmation, openGeneric, MODAL_TYPES } = useModal();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const {
    data: items,
    loading,
    error,
    createItem,
    updateItem,
    deleteItem,
    searchItems,
    exportData,
    fetchData
  } = useGenericData({
    service: itemService,
    autoFetch: true
  });

  const columns = [
    { key: 'id', title: 'ID', headerClassName: 'w-16' },
    { key: 'title', title: 'Title' },
    { key: 'description', title: 'Description' },
    { 
      key: 'status', 
      title: 'Status', 
      type: 'badge',
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          value === 'active' ? 'bg-green-100 text-green-800' :
          value === 'pending' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {value}
        </span>
      )
    },
    { key: 'createdAt', title: 'Created', type: 'date' },
    {
      key: 'actions',
      title: 'Actions',
      render: (value, item) => (
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleView(item)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleEdit(item)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleDelete(item)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  const handleView = (item) => {
    openGeneric(MODAL_TYPES.ACTION_MODAL, {
      title: 'View Item',
      content: (
        <div className="space-y-4">
          <div>
            <label className="font-semibold">Title:</label>
            <p>{item.title}</p>
          </div>
          <div>
            <label className="font-semibold">Description:</label>
            <p>{item.description}</p>
          </div>
          <div>
            <label className="font-semibold">Status:</label>
            <p>{item.status}</p>
          </div>
        </div>
      )
    });
  };

  const handleEdit = (item) => {
    // Open edit form modal
    openGeneric(MODAL_TYPES.EDIT_ITEM, {
      title: 'Edit Item',
      content: <div>Edit form would go here</div>
    });
  };

  const handleDelete = (item) => {
    openConfirmation({
      title: 'Delete Item',
      message: `Are you sure you want to delete "${item.title}"?`,
      type: 'error',
      onConfirm: () => deleteItem(item.id)
    });
  };

  const handleCreate = () => {
    openGeneric(MODAL_TYPES.CREATE_ITEM, {
      title: 'Create New Item',
      content: <div>Create form would go here</div>
    });
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term) {
      searchItems(term);
    } else {
      fetchData();
    }
  };

  const handleExport = () => {
    exportData('csv');
  };

  const handleRefresh = () => {
    fetchData();
  };

  const headerActions = (
    <Button onClick={handleCreate}>
      <Plus className="h-4 w-4 mr-2" />
      Create Item
    </Button>
  );

  return (
    <div className="p-6">
      <GenericTable
        title="Items Management"
        data={items || []}
        columns={columns}
        loading={loading}
        searchable={true}
        filterable={true}
        exportable={true}
        refreshable={true}
        onSearch={handleSearch}
        onExport={handleExport}
        onRefresh={handleRefresh}
        headerActions={headerActions}
        emptyMessage="No items found. Create your first item to get started."
      />
    </div>
  );
};

export default Items;

import React, { useState } from 'react';
import { useModal } from '@/hooks/useModal';
import GenericTable from '@/components/reuseable/GenericTable';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Eye, UserCheck } from 'lucide-react';
import { useGenericData } from '@/hooks/useGenericData';
import { userService } from '@/services/genericApiService';

const Users = () => {
  const { openConfirmation, openGeneric, MODAL_TYPES } = useModal();

  const {
    data: users,
    loading,
    createItem,
    updateItem,
    deleteItem,
    searchItems,
    exportData,
    fetchData
  } = useGenericData({
    service: userService,
    autoFetch: true
  });

  const columns = [
    { key: 'id', title: 'ID', headerClassName: 'w-16' },
    { key: 'fullName', title: 'Full Name' },
    { key: 'email', title: 'Email' },
    { key: 'phoneNumber', title: 'Phone' },
    { 
      key: 'role', 
      title: 'Role', 
      render: (value) => (
        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
          {value?.name || value}
        </span>
      )
    },
    { 
      key: 'isActive', 
      title: 'Status', 
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {value ? 'Active' : 'Inactive'}
        </span>
      )
    },
    { key: 'createdAt', title: 'Created', type: 'date' },
    {
      key: 'actions',
      title: 'Actions',
      render: (value, user) => (
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleView(user)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleEdit(user)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleToggleStatus(user)}
          >
            <UserCheck className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleDelete(user)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  const handleView = (user) => {
    openGeneric(MODAL_TYPES.ACTION_MODAL, {
      title: 'User Details',
      content: (
        <div className="space-y-4">
          <div>
            <label className="font-semibold">Name:</label>
            <p>{user.fullName}</p>
          </div>
          <div>
            <label className="font-semibold">Email:</label>
            <p>{user.email}</p>
          </div>
          <div>
            <label className="font-semibold">Phone:</label>
            <p>{user.phoneNumber}</p>
          </div>
          <div>
            <label className="font-semibold">Role:</label>
            <p>{user.role?.name || user.role}</p>
          </div>
        </div>
      )
    });
  };

  const handleEdit = (user) => {
    openGeneric(MODAL_TYPES.EDIT_ITEM, {
      title: 'Edit User',
      content: <div>Edit user form would go here</div>
    });
  };

  const handleToggleStatus = (user) => {
    const action = user.isActive ? 'deactivate' : 'activate';
    openConfirmation({
      title: `${action.charAt(0).toUpperCase() + action.slice(1)} User`,
      message: `Are you sure you want to ${action} "${user.fullName}"?`,
      type: 'warning',
      onConfirm: () => updateItem(user.id, { isActive: !user.isActive })
    });
  };

  const handleDelete = (user) => {
    openConfirmation({
      title: 'Delete User',
      message: `Are you sure you want to delete "${user.fullName}"?`,
      type: 'error',
      onConfirm: () => deleteItem(user.id)
    });
  };

  const handleCreate = () => {
    openGeneric(MODAL_TYPES.CREATE_ITEM, {
      title: 'Create New User',
      content: <div>Create user form would go here</div>
    });
  };

  const handleSearch = (term) => {
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
      Create User
    </Button>
  );

  return (
    <div className="p-6">
      <GenericTable
        title="Users Management"
        data={users || []}
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
        emptyMessage="No users found. Create your first user to get started."
      />
    </div>
  );
};

export default Users;
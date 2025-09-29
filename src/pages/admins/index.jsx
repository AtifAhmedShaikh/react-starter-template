import React from 'react';
import { useModal } from '@/hooks/useModal';
import GenericTable from '@/components/reuseable/GenericTable';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, Eye, Shield } from 'lucide-react';
import { useGenericData } from '@/hooks/useGenericData';
import { userService } from '@/services/genericApiService';

const Admins = () => {
  const { openConfirmation, openGeneric, MODAL_TYPES } = useModal();

  const {
    data: admins,
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
        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
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
    { key: 'lastLogin', title: 'Last Login', type: 'datetime' },
    { key: 'createdAt', title: 'Created', type: 'date' },
    {
      key: 'actions',
      title: 'Actions',
      render: (value, admin) => (
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleView(admin)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleEdit(admin)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleManagePermissions(admin)}
          >
            <Shield className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleDelete(admin)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  const handleView = (admin) => {
    openGeneric(MODAL_TYPES.ACTION_MODAL, {
      title: 'Admin Details',
      content: (
        <div className="space-y-4">
          <div>
            <label className="font-semibold">Name:</label>
            <p>{admin.fullName}</p>
          </div>
          <div>
            <label className="font-semibold">Email:</label>
            <p>{admin.email}</p>
          </div>
          <div>
            <label className="font-semibold">Phone:</label>
            <p>{admin.phoneNumber}</p>
          </div>
          <div>
            <label className="font-semibold">Role:</label>
            <p>{admin.role?.name || admin.role}</p>
          </div>
          <div>
            <label className="font-semibold">Last Login:</label>
            <p>{admin.lastLogin ? new Date(admin.lastLogin).toLocaleString() : 'Never'}</p>
          </div>
        </div>
      )
    });
  };

  const handleEdit = (admin) => {
    openGeneric(MODAL_TYPES.EDIT_ITEM, {
      title: 'Edit Admin',
      content: <div>Edit admin form would go here</div>
    });
  };

  const handleManagePermissions = (admin) => {
    openGeneric(MODAL_TYPES.ACTION_MODAL, {
      title: 'Manage Permissions',
      content: <div>Permission management form would go here</div>
    });
  };

  const handleDelete = (admin) => {
    openConfirmation({
      title: 'Delete Admin',
      message: `Are you sure you want to delete "${admin.fullName}"?`,
      type: 'error',
      onConfirm: () => deleteItem(admin.id)
    });
  };

  const handleCreate = () => {
    openGeneric(MODAL_TYPES.CREATE_ITEM, {
      title: 'Create New Admin',
      content: <div>Create admin form would go here</div>
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
      Create Admin
    </Button>
  );

  return (
    <div className="p-6">
      <GenericTable
        title="Administrators Management"
        data={admins || []}
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
        emptyMessage="No administrators found. Create your first admin to get started."
      />
    </div>
  );
};

export default Admins;
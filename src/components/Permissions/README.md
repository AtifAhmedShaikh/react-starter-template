# Permissions Module

This module provides a complete permission management system for the application.

## Features

- ✅ **CRUD Operations**: Create, Read, Update, Delete permissions
- ✅ **Search & Filter**: Real-time search through permissions
- ✅ **Import/Export**: Excel file import/export functionality
- ✅ **Form Validation**: Zod schema validation with proper error handling
- ✅ **Redux Integration**: Centralized state management
- ✅ **Permission-based Access**: Route protection based on user permissions
- ✅ **Responsive Design**: Mobile-friendly interface
- ✅ **Loading States**: Proper loading indicators for all operations

## Components

### PermissionTable
Main component that displays the permissions table with all CRUD operations.

**Props**: None (uses Redux for state management)

**Features**:
- Search functionality
- Add/Edit/Delete permissions via ModalManager
- Import/Export Excel files
- Cached data fetching (5-minute cache)
- Loading states

### Modal Components
- **AddPermissionModal**: Handles permission creation
- **EditPermissionModal**: Handles permission updates
- **DeletePermissionModal**: Handles permission deletion

All modals are managed through the centralized ModalManager system.

### PermissionsPage
Page component that wraps the PermissionTable.

## Hooks

### useImportExport
Custom hook for handling Excel file import/export operations.

```javascript
const { handleExport, handleImport, loading } = useImportExport();

// Export permissions
handleExport(API_ENDPOINT, filename);

// Import permissions
handleImport(API_ENDPOINT, onSuccessCallback);
```

### useSearchFilter
Custom hook for filtering data based on search terms.

```javascript
const { searchTerm, setSearchTerm, filteredData, clearSearch } = useSearchFilter(
  data,
  searchFields
);
```

## Redux Store

### permissionSlice
Redux slice managing permission state and async operations.

**State**:
```javascript
{
  permissions: [],
  status: 'idle',
  error: null,
  lastFetched: null, // Timestamp for caching
  loading: {
    fetch: false,
    create: false,
    update: false,
    delete: false
  }
}
```

**Caching**: Permissions are cached for 5 minutes to prevent unnecessary API calls.

**Actions**:
- `fetchPermissionsAsync()` - Fetch all permissions
- `createPermissionAsync(data)` - Create new permission
- `updatePermissionAsync({id, data})` - Update existing permission
- `deletePermissionAsync(id)` - Delete permission

## API Endpoints

All API calls use the `apiHandler` function with the following endpoints:

```javascript
PERMISSION_APIS = {
  GET_ALL_PERMISSIONS: "/api/permissions",
  CREATE_PERMISSION: "/api/permissions",
  UPDATE_PERMISSION: "/api/permissions",
  DELETE_PERMISSION: "/api/permissions",
  EXPORT_PERMISSIONS: "/api/permissions/export",
  IMPORT_PERMISSIONS: "/api/permissions/import",
}
```

## Usage

### Basic Usage
```javascript
import PermissionTable from '@/components/Permissions/PermissionTable';

function MyPage() {
  return <PermissionTable />;
}
```

### Modal Usage
```javascript
import { useModal } from '@/hooks/useModal';
import { MODAL_TYPES } from '@/stores/slices/modalSlice';

function MyComponent() {
  const { open } = useModal();

  const handleAddPermission = () => {
    open(MODAL_TYPES.ADD_PERMISSION);
  };

  const handleEditPermission = (permission) => {
    open(MODAL_TYPES.EDIT_PERMISSION, { permission });
  };

  const handleDeletePermission = (permission) => {
    open(MODAL_TYPES.DELETE_PERMISSION, { permission });
  };

  return (
    <div>
      {/* Your component content */}
    </div>
  );
}
```

### With Redux
```javascript
import { useDispatch, useSelector } from 'react-redux';
import { fetchPermissionsAsync, selectPermissions } from '@/stores/slices/permissionSlice';

function MyComponent() {
  const dispatch = useDispatch();
  const permissions = useSelector(selectPermissions);

  useEffect(() => {
    dispatch(fetchPermissionsAsync());
  }, [dispatch]);

  return <div>{/* Your component */}</div>;
}
```

## Form Validation

The module uses Zod schema validation:

```javascript
const permissionSchema = z.object({
  key: z.string()
    .min(1, "Permission key is required")
    .regex(/^[a-z_]+$/, "Only lowercase letters and underscores are allowed")
    .max(50, "Permission key must be less than 50 characters"),
  value: z.string()
    .min(1, "Permission description is required")
    .max(100, "Permission description must be less than 100 characters"),
});
```

## Input Sanitization

The module includes input sanitization utilities:

```javascript
import { sanitizeToLowerUnderscoreOnlyLetters } from '@/utils/inputSanitizers';

// Use in form inputs
<TextField onInput={sanitizeToLowerUnderscoreOnlyLetters} />
```

## Permission-based Access

The permissions page is protected by the `can_manage_permissions` permission:

```javascript
// In router config
{
  path: "/permissions",
  element: <PermissionRoutesWrapper 
    permissionKey={PermissionKeys.can_manage_permissions} 
    Component={PermissionsPage} 
  />
}
```

## Styling

The module uses the existing UI components and follows the application's design system:
- `@/components/ui/table` for table display
- `@/components/ui/dialog` for modals
- `@/components/ui/button` for actions
- `@/components/reuseable/TextField` for form inputs
- Tailwind CSS for styling

## Error Handling

All operations include proper error handling:
- API errors are caught and displayed via toast notifications
- Form validation errors are shown inline
- Loading states prevent multiple submissions
- Network errors are handled gracefully

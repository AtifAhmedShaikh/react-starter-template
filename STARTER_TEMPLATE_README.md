# React Starter Template

A comprehensive, reusable React starter template with modern architecture, built-in components, and best practices.

## 🚀 Features

### Core Features
- **React 19** with modern hooks and patterns
- **Vite** for fast development and building
- **TypeScript/JavaScript** support
- **Tailwind CSS** for styling
- **Redux Toolkit** for state management
- **React Router** for navigation
- **React Hook Form** with validation
- **ECharts** for data visualization

### Authentication & Authorization
- Complete auth system (login, register, forgot password)
- Role-based permissions system
- Protected routes
- User profile management
- Settings and preferences

### UI Components
- **Generic Table** - Reusable data table with search, filter, export
- **Generic Form** - Dynamic form builder with validation
- **Generic Modal** - Modal management system
- **Generic Dashboard** - Analytics dashboard with ECharts
- **Confirmation Modal** - Standard confirmation dialogs
- **Forward Modal** - Item forwarding system

### State Management
- **Redux Toolkit** with slices
- **Modal Management** - Centralized modal state
- **Socket Integration** - Real-time notifications
- **Generic Data Hooks** - Reusable data fetching

### API Integration
- **Generic API Service** - CRUD operations
- **Axios** with interceptors
- **Error Handling** - Centralized error management
- **Loading States** - Built-in loading management

## 📁 Project Structure

```
src/
├── components/
│   ├── reuseable/          # Generic reusable components
│   │   ├── GenericTable.jsx
│   │   ├── GenericForm.jsx
│   │   ├── GenericModal.jsx
│   │   ├── ConfirmationModal.jsx
│   │   ├── ForwardToModal.jsx
│   │   └── ModalManager.jsx
│   ├── Dashboard/          # Dashboard components
│   │   ├── GenericDashboard.jsx
│   │   └── EChartsRenderer.jsx
│   └── ui/                 # Base UI components
├── pages/                  # Page components (index.jsx convention)
│   ├── Dashboard/
│   ├── Login/
│   ├── Users/
│   └── ...
├── hooks/                  # Custom hooks
│   ├── useModal.js
│   ├── useGenericData.js
│   └── ...
├── services/               # API services
│   └── genericApiService.js
├── stores/                 # Redux store
│   ├── slices/
│   │   ├── authSlice.js
│   │   ├── modalSlice.js
│   │   └── ...
│   └── index.js
├── constants/              # App constants
│   ├── permissions.js
│   └── APIs.js
└── utils/                  # Utility functions
```

## 🛠 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd react-starter-template
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

## 📖 Usage

### Generic Table Component

```jsx
import GenericTable from '@/components/reuseable/GenericTable';

const columns = [
  { key: 'id', title: 'ID' },
  { key: 'name', title: 'Name' },
  { key: 'email', title: 'Email' },
  { key: 'status', title: 'Status', type: 'badge' },
  { key: 'createdAt', title: 'Created', type: 'date' }
];

const MyTable = () => {
  return (
    <GenericTable
      title="Users"
      data={users}
      columns={columns}
      loading={loading}
      onSearch={handleSearch}
      onExport={handleExport}
      onRowClick={handleRowClick}
    />
  );
};
```

### Generic Form Component

```jsx
import GenericForm from '@/components/reuseable/GenericForm';
import * as yup from 'yup';

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email().required('Email is required'),
});

const fields = [
  { name: 'name', type: 'text', label: 'Name', required: true },
  { name: 'email', type: 'email', label: 'Email', required: true },
  { name: 'role', type: 'select', label: 'Role', options: roleOptions },
  { name: 'active', type: 'switch', label: 'Active' }
];

const MyForm = () => {
  return (
    <GenericForm
      title="Create User"
      fields={fields}
      validationSchema={schema}
      onSubmit={handleSubmit}
    />
  );
};
```

### Modal Management

```jsx
import { useModal } from '@/hooks/useModal';

const MyComponent = () => {
  const { openConfirmation, openForwardTo, MODAL_TYPES } = useModal();

  const handleDelete = () => {
    openConfirmation({
      title: 'Delete Item',
      message: 'Are you sure you want to delete this item?',
      type: 'error',
      onConfirm: () => deleteItem()
    });
  };

  const handleForward = () => {
    openForwardTo({
      title: 'Forward Item',
      onSubmit: (data) => forwardItem(data),
      options: {
        roles: roles,
        locations: locations,
        statuses: statuses
      }
    });
  };
};
```

### Generic Data Hook

```jsx
import { useGenericData } from '@/hooks/useGenericData';
import { userService } from '@/services/genericApiService';

const MyComponent = () => {
  const {
    data: users,
    loading,
    error,
    createItem,
    updateItem,
    deleteItem,
    searchItems,
    exportData
  } = useGenericData({
    service: userService,
    selector: selectUsers,
    action: setUsers,
    autoFetch: true
  });

  // Use the data and methods...
};
```

### Dashboard with ECharts

```jsx
import GenericDashboard from '@/components/Dashboard/GenericDashboard';

const MyDashboard = () => {
  const data = {
    totalItems: 100,
    newItems: 25,
    pendingItems: 30,
    completedItems: 45,
    statusBreakdown: [
      { status: 'Active', count: 60 },
      { status: 'Inactive', count: 40 }
    ],
    categoryDistribution: [
      { category: 'Type A', count: 50 },
      { category: 'Type B', count: 30 },
      { category: 'Type C', count: 20 }
    ]
  };

  return (
    <GenericDashboard 
      data={data} 
      title="My Analytics Dashboard" 
    />
  );
};
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=My App
VITE_SOCKET_URL=ws://localhost:3000
```

### API Configuration

Update `src/constants/APIs.js` with your API endpoints:

```javascript
export const AUTH_APIS = {
  LOGIN: "/api/auth/login",
  REGISTER: "/api/auth/register",
  // ... other endpoints
};
```

### Permissions

Configure permissions in `src/constants/permissions.js`:

```javascript
export const PermissionKeys = {
  can_view_dashboard: "can_view_dashboard",
  can_create_users: "can_create_users",
  // ... other permissions
};
```

## 🎨 Theming

The template uses Tailwind CSS with a custom design system. You can customize:

- Colors in `tailwind.config.js`
- Component styles in `src/index.css`
- Theme variables in CSS custom properties

## 📱 Responsive Design

All components are built with mobile-first responsive design:

- Breakpoints: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`
- Mobile-optimized tables and forms
- Responsive charts and dashboards
- Touch-friendly interactions

## 🔒 Security Features

- JWT token management
- Role-based access control
- Protected routes
- Input validation and sanitization
- CSRF protection
- XSS prevention

## 🚀 Deployment

### Build for Production

```bash
npm run build
# or
pnpm build
```

### Deploy to Vercel

```bash
vercel --prod
```

### Deploy to Netlify

```bash
npm run build
# Upload dist/ folder to Netlify
```

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [ECharts Documentation](https://echarts.apache.org/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Check the documentation
- Review existing issues and discussions

---

**Happy Coding! 🎉**

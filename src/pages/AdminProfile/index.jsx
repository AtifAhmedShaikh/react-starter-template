import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Shield, Activity, Mail, Phone, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGenericData } from '@/hooks/useGenericData';
import { userService } from '@/services/genericApiService';

const AdminProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: admin,
    loading,
    error
  } = useGenericData({
    service: userService,
    autoFetch: false
  });

  React.useEffect(() => {
    if (id) {
      // Fetch admin by ID
      userService.getById(id);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !admin) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Admin Not Found</h2>
          <p className="text-gray-600 mb-4">The requested admin profile could not be found.</p>
          <Button onClick={() => navigate('/admins')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Admins
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <Button
          variant="outline"
          onClick={() => navigate('/admins')}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Admins
        </Button>
        <h1 className="text-3xl font-bold text-gray-900">Admin Profile</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-gray-600">
                  {admin.fullName?.charAt(0) || 'A'}
                </span>
              </div>
              <CardTitle className="text-xl">{admin.fullName}</CardTitle>
              <Badge variant="secondary" className="w-fit mx-auto">
                {admin.role?.name || admin.role}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">{admin.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">{admin.phoneNumber}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">
                  Joined {new Date(admin.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="pt-4">
                <Button className="w-full">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Details and Activity */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Basic Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Full Name</label>
                  <p className="text-lg">{admin.fullName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Email</label>
                  <p className="text-lg">{admin.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Phone Number</label>
                  <p className="text-lg">{admin.phoneNumber}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Role</label>
                  <p className="text-lg">{admin.role?.name || admin.role}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  <Badge className={admin.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {admin.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Last Login</label>
                  <p className="text-lg">
                    {admin.lastLogin ? new Date(admin.lastLogin).toLocaleString() : 'Never'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activity Log */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">Profile updated</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">Logged in</p>
                    <p className="text-xs text-gray-500">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">Password changed</p>
                    <p className="text-xs text-gray-500">3 days ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
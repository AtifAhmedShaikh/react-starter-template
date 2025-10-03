import { useDispatch, useSelector } from "react-redux";
import { User, Mail, Phone, CreditCard, MapPin, Calendar, Shield, Building } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  closeModal,
  MODAL_TYPES,
  selectIsModalOpenByType,
  selectModalData,
} from "@/stores/slices/modalSlice";

import ModalWrapper from "../reuseable/ModalWrapper";
import { formatDate } from "@/utils/formatters";

const ViewAdminDetailsModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsModalOpenByType(MODAL_TYPES.VIEW_ADMIN_DETAILS));
  const admin = useSelector(selectModalData);

  if (!admin) return null;

  const getGenderBadgeVariant = (gender) => {
    switch (gender?.toLowerCase()) {
      case 'male':
        return 'default';
      case 'female':
        return 'secondary';
      case 'other':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  return (
    <ModalWrapper isOpen={isOpen} title={`Admin Details - ${admin.fullName}`}>
      <div className="space-y-6">
        {/* Profile Header */}
        <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
            {admin.profileImage ? (
              <img
                src={admin.profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-8 h-8 text-blue-600" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{admin.fullName}</h3>
            <p className="text-sm text-gray-600">{admin.email}</p>
            <Badge variant={getGenderBadgeVariant(admin.gender)} className="mt-1">
              {admin.gender || 'N/A'}
            </Badge>
          </div>
        </div>

        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-base">
              <User className="w-4 h-4 mr-2" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Email</p>
                  <p className="text-sm text-gray-600">{admin.email}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Phone</p>
                  <p className="text-sm text-gray-600">{admin.phoneNumber || 'N/A'}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <CreditCard className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">CNIC</p>
                  <p className="text-sm text-gray-600">{admin.cnic || 'N/A'}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Created At</p>
                  <p className="text-sm text-gray-600">{formatDate(admin.createdAt)}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Role & Location */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-base">
              <Shield className="w-4 h-4 mr-2" />
              Role & Location
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Role</p>
                  <Badge variant="outline" className="mt-1">
                    {admin.role?.value || 'No role assigned'}
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Building className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-700">City</p>
                  <p className="text-sm text-gray-600">{admin.city?.name || 'N/A'}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Address */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-base">
              <MapPin className="w-4 h-4 mr-2" />
              Address
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">{admin.address || 'No address provided'}</p>
          </CardContent>
        </Card>

        {/* Additional Information */}
        {(admin.updatedAt || admin.lastLoginAt) && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-base">
                <Calendar className="w-4 h-4 mr-2" />
                Additional Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {admin.updatedAt && (
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Last Updated</p>
                    <p className="text-sm text-gray-600">{formatDate(admin.updatedAt)}</p>
                  </div>
                </div>
              )}
              
              {admin.lastLoginAt && (
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Last Login</p>
                    <p className="text-sm text-gray-600">{formatDate(admin.lastLoginAt)}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={() => dispatch(closeModal())}>
          Close
        </Button>
      </DialogFooter>
    </ModalWrapper>
  );
};

export default ViewAdminDetailsModal;

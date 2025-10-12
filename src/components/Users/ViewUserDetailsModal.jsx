import { Building, Calendar, CreditCard, Mail, Phone, Shield, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DialogFooter } from "@/components/ui/dialog";
import { ProfileImage } from "@/components/ui/image-variants";

import {
  closeModal,
  MODAL_TYPES,
  selectIsModalOpenByType,
  selectModalData,
} from "@/stores/slices/modalSlice";

import { formatDate } from "@/utils/formatters";
import ModalWrapper from "../reuseable/ModalWrapper";

const ViewUserDetailsModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsModalOpenByType(MODAL_TYPES.VIEW_USER_DETAILS));
  const user = useSelector(selectModalData);

  if (!user) return null;

  return (
    <ModalWrapper isOpen={isOpen} title={`User Details - ${user.fullName}`}>
      <div className="space-y-6">
        {/* Profile Header */}
        <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center overflow-hidden">
            {user.profileImage ? (
              <ProfileImage
                src={user.profileImage}
                alt="Profile"
                size="lg"
                className="w-full h-full"
              />
            ) : (
              <User className="w-8 h-8 text-blue-600" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{user.fullName}</h3>
            <p className="text-sm text-gray-600">{user.email}</p>
            <Badge variant="outline" className="mt-1">
              {user.gender || 'N/A'}
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
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">Email</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">Phone</p>
                  <p className="text-sm text-gray-600">{user.phoneNumber || 'N/A'}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <CreditCard className="w-4 h-4 text-gray-400" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">CNIC</p>
                  <p className="text-sm text-gray-600">{user.cnic || 'N/A'}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="w-4 h-4 text-gray-400" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">Created At</p>
                  <p className="text-sm text-gray-600">{formatDate(user.createdAt)}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Shield className="w-4 h-4 text-gray-400" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">Role</p>
                  <Badge variant="outline" className="mt-1">
                    {user.role?.value || 'No role assigned'}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Building className="w-4 h-4 text-gray-400" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">City</p>
                  <p className="text-sm text-gray-600">{user.city?.value || 'N/A'}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={() => dispatch(closeModal())}>
          Close
        </Button>
      </DialogFooter>
    </ModalWrapper>
  );
};

export default ViewUserDetailsModal;

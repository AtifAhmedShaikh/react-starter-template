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

const ViewAdminDetailsModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsModalOpenByType(MODAL_TYPES.VIEW_ADMIN_DETAILS));
  const admin = useSelector(selectModalData);

  if (!admin) return null;

  return (
    <ModalWrapper isOpen={isOpen} title={`Admin Details - ${admin.fullName}`}>
      <div className="space-y-6">
        {/* Profile Header */}
        <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
            {admin.profileImage ? (
              <ProfileImage
                src={admin.profileImage}
                alt="Profile"
                size="lg"
                className="w-full h-full"
              />
            ) : (
              <User className="w-8 h-8 text-primary" />
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{admin.fullName}</h3>
            <p className="text-sm text-muted-foreground">{admin.email}</p>
            <Badge variant="outline"  className="mt-1">
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
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Email</p>
                  <p className="text-sm text-muted-foreground">{admin.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Phone</p>
                  <p className="text-sm text-muted-foreground">{admin.phoneNumber || 'N/A'}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <CreditCard className="w-4 h-4 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">CNIC</p>
                  <p className="text-sm text-muted-foreground">{admin.cnic || 'N/A'}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Created At</p>
                  <p className="text-sm text-muted-foreground">{formatDate(admin.createdAt)}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Shield className="w-4 h-4 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Role</p>
                  <Badge variant="outline" className="mt-1">
                    {admin.role?.value || 'No role assigned'}
                  </Badge>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Building className="w-4 h-4 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">City</p>
                  <p className="text-sm text-muted-foreground">{admin.city?.value || 'N/A'}</p>
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

export default ViewAdminDetailsModal;

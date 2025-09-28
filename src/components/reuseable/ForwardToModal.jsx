import React, { useState } from 'react';
import GenericModal from './GenericModal';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Send } from "lucide-react";

const ForwardToModal = ({
  isOpen,
  onClose,
  title = "Forward Item",
  onSubmit,
  isLoading = false,
  options = {
    roles: [],
    locations: [],
    statuses: []
  }
}) => {
  const [formData, setFormData] = useState({
    role: '',
    location: '',
    status: '',
    remarks: '',
    selectedOfficers: []
  });

  const [selectedOfficer, setSelectedOfficer] = useState('');

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddOfficer = () => {
    if (selectedOfficer && !formData.selectedOfficers.some(o => o.id === selectedOfficer)) {
      const officer = options.officers?.find(o => o.id === selectedOfficer);
      if (officer) {
        setFormData(prev => ({
          ...prev,
          selectedOfficers: [...prev.selectedOfficers, officer]
        }));
        setSelectedOfficer('');
      }
    }
  };

  const handleRemoveOfficer = (officerId) => {
    setFormData(prev => ({
      ...prev,
      selectedOfficers: prev.selectedOfficers.filter(o => o.id !== officerId)
    }));
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  const handleClose = () => {
    setFormData({
      role: '',
      location: '',
      status: '',
      remarks: '',
      selectedOfficers: []
    });
    setSelectedOfficer('');
    onClose();
  };

  const isFormValid = formData.role && formData.location && formData.status && formData.selectedOfficers.length > 0;

  return (
    <GenericModal
      isOpen={isOpen}
      onClose={handleClose}
      title={title}
      size="lg"
      showCloseButton={!isLoading}
    >
      <div className="space-y-6">
        {/* Role Selection */}
        <div className="space-y-2">
          <Label htmlFor="role">Designation *</Label>
          <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select designation" />
            </SelectTrigger>
            <SelectContent>
              {options.roles?.map((role) => (
                <SelectItem key={role.id} value={role.id}>
                  {role.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Location Selection */}
        <div className="space-y-2">
          <Label htmlFor="location">Location *</Label>
          <Select value={formData.location} onValueChange={(value) => handleInputChange('location', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              {options.locations?.map((location) => (
                <SelectItem key={location.id} value={location.id}>
                  {location.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Status Selection */}
        <div className="space-y-2">
          <Label htmlFor="status">Status *</Label>
          <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {options.statuses?.map((status) => (
                <SelectItem key={status.id} value={status.id}>
                  {status.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Officer Selection */}
        {options.officers && options.officers.length > 0 && (
          <Card className="border-dashed">
            <CardHeader>
              <CardTitle className="text-sm flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Officer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                <Select value={selectedOfficer} onValueChange={setSelectedOfficer}>
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder="Select officer" />
                  </SelectTrigger>
                  <SelectContent>
                    {options.officers
                      ?.filter(officer => !formData.selectedOfficers.some(so => so.id === officer.id))
                      ?.map((officer) => (
                        <SelectItem key={officer.id} value={officer.id}>
                          {officer.name} ({officer.designation})
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                <Button 
                  type="button" 
                  onClick={handleAddOfficer}
                  disabled={!selectedOfficer}
                  size="sm"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Selected Officers */}
        {formData.selectedOfficers.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center text-sm">
                Selected Officers
                <Badge variant="secondary">{formData.selectedOfficers.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {formData.selectedOfficers.map((officer) => (
                  <div key={officer.id} className="flex justify-between items-center p-2 border rounded-lg">
                    <span className="text-sm">{officer.name} ({officer.designation})</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveOfficer(officer.id)}
                      className="text-destructive h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Remarks */}
        <div className="space-y-2">
          <Label htmlFor="remarks">Remarks</Label>
          <Textarea
            id="remarks"
            placeholder="Enter remarks (optional)"
            value={formData.remarks}
            onChange={(e) => handleInputChange('remarks', e.target.value)}
            rows={3}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={!isFormValid || isLoading}
            className="min-w-[120px]"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Forwarding...</span>
              </div>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Forward Item
              </>
            )}
          </Button>
        </div>
      </div>
    </GenericModal>
  );
};

export default ForwardToModal;

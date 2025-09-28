"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Plus, X } from "lucide-react"
import ComboboxField from "../../reuseable/ComboboxField"


export const StepOne = ({
  roles,
  roleLoading,
  currentCharge,
  selectedCharges,
  chargesOptions,
  errors,
  handleAddCharge,
  handleRemoveCharge,
  handleLocationChange,
  locationHierarchy
}) => {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <ComboboxField
          name="role"
          label="Role"
          placeholder="Select Role"
          options={roles}
          valueKey="id"        // ✅ Store role ID instead of level
          labelKey="value"
          error={errors.role?.message}
          isLoading={roleLoading}
        />
        {locationHierarchy.map((entry, index) => (
          <ComboboxField
            key={index}
            name={`location_level_${entry.level}`}
            label={`Select Location`}
            placeholder={`Select`}
            options={entry.options}
            valueKey="id"
            labelKey="name"
            value={entry.selectedId}
            onChange={(selectedId) => handleLocationChange(index, selectedId)}
            error={errors[`location_level_${entry.level}`]?.message}
            isLoading={entry.loading}
          />
        ))}

      </div>

      {chargesOptions.length > 0 && chargesOptions.filter((charge) => !selectedCharges.some((c) => c.id === charge.id)) && (
        <Card className="border-dashed gap-0">
          <CardHeader className="">
            <CardTitle className="text-sm flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add officer
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex gap-3">
              <div className="flex-1">
                <ComboboxField
                  name="currentCharge"
                  label=""
                  placeholder="search an officer by name or charge"
                  options={chargesOptions
                    .filter((charge) => !selectedCharges.some((c) => c.id === charge.id))
                    .map((charge) => ({
                      ...charge,
                      displayLabel: `${charge.assignedPerson?.fullName || "Unassigned"} (${charge.chargeName})`,
                    }))
                  }
                  valueKey="id"
                  labelKey="displayLabel"  // ✅ Use combined label
                  disableKey={"isCurrentlyInCustody"}
                  error={errors.currentCharge?.message}
                  isLoading={false}
                />

              </div>
              <Button
                type="button"
                onClick={handleAddCharge}
                disabled={!currentCharge || selectedCharges.some((c) => c.id === currentCharge)}
                className="self-end"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {selectedCharges.length > 0 && (
        <Card >
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              Selected Officers
              <Badge variant="secondary">{selectedCharges.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {selectedCharges.map((charge, index) => (
                <div key={charge.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-xs">
                      {index + 1}
                    </Badge>
                    <span className="font-medium">{charge.assignedPerson?.fullName || "Unassigned"} ({charge.chargeName})</span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveCharge(charge.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            {errors.charges && (
              <div className="flex items-center gap-2 mt-3 text-destructive text-sm">
                <AlertCircle className="w-4 h-4" />
                {errors.charges.message}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

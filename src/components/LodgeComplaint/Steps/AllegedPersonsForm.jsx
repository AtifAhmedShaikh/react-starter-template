import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
// Generic placeholders for future API integration
// import {
//     fetchDepartmentsAsync,
//     selectDepartments,
//     selectDepartmentsLoading,
// } from "@/stores/slices/metadataSlice";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "@/utils/toastUtils";
import { AllegedPersonFormDialog } from "./AllegedPersonDialog";


const AllegedPersonsForm = () => {
  const { control } = useFormContext();
  const dispatch = useDispatch();
  const { fields, append, update, remove } = useFieldArray({
    control,
    name: "allegedPersons",
  });

  // Generic placeholders for future API integration
  const selectors = {
    departments: [], // Will be fetched from API in future
    departmentsLoading: false,
  };

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const removedEditedIndex = useRef(null);

  // useEffect(() => {
  //   dispatch(fetchDepartmentsAsync());
  // }, [dispatch]);

  useEffect(() => {
    if (editingIndex !== null && !fields[editingIndex]) {
      removedEditedIndex.current = editingIndex;
      setDialogOpen(false);
      setEditingIndex(null);
    }
  }, [fields, editingIndex]);

  const handleAddNew = () => {
    setEditingIndex(null);
    removedEditedIndex.current = null;
    setDialogOpen(true);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    removedEditedIndex.current = null;
    setDialogOpen(true);
  };

  const handleSubmit = (data) => {
    if (editingIndex === null && removedEditedIndex.current !== null) {
      showToast.error("You removed the person you were editing. Cannot re-add it.");
      return;
    }

    if (editingIndex !== null) {
      if (!fields[editingIndex]) {
        showToast.error("The person you were editing was removed.");
        setDialogOpen(false);
        setEditingIndex(null);
        return;
      }
      update(editingIndex, data);
    } else {
      append(data);
    }

    setDialogOpen(false);
    setEditingIndex(null);
    removedEditedIndex.current = null;
  };

  return (
    <div className="space-y-6 sm:min-h-96">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Alleged Persons</h2>
        <Button variant="default" onClick={handleAddNew}>
          <Plus className="mr-1" /> Add Alleged Person
        </Button>
      </div>

      {fields.length > 0 ? (
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fields.map((person, index) => {
                const department = selectors.departments.find(
                  d => d.id === person.departmentId
                );

                // Show "Other Department" text if department is "other" and otherDepartment is provided
                const departmentDisplay = department?.key?.toLowerCase() === "other" && person.otherDepartment 
                  ? person.otherDepartment 
                  : department?.value || "-";

                return (
                  <TableRow key={person.id}>
                    <TableCell className="font-medium">
                      {person.name || "-"}
                    </TableCell>
                    <TableCell>{person.designation || "-"}</TableCell>
                    <TableCell>{departmentDisplay}</TableCell>
                    <TableCell>{person.phoneNumber || "-"}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(index)}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => remove(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground border rounded-md">
          No alleged persons added yet
        </div>
      )}

      <AllegedPersonFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleSubmit}
        initialData={editingIndex !== null ? fields[editingIndex] : null}
        departments={selectors.departments}
        departmentsLoading={selectors.departmentsLoading}
      />
    </div>
  );
};

export default AllegedPersonsForm;
                            
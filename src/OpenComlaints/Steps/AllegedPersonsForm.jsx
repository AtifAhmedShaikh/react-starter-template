import { useFormContext, useFieldArray } from "react-hook-form";
import { useSelector } from "react-redux";
// Generic placeholders for future API integration
// import { fetchDepartmentsAsync, selectDepartments, selectDepartmentsLoading } from "@/stores/slices/metadataSlice";
import { TextField } from "@/components/reuseable/TextField";
import SelectField from "../SelectField";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ComboboxField from "@/components/reuseable/SearchableSelectField";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const AllegedPeronsForm = () => {
    const { control, register, formState: { errors } } = useFormContext();
    const dispatch=useDispatch()
    const { fields, append, remove } = useFieldArray({ control, name: "allegedPersons" });
    // Generic placeholders for future API integration
    const selectors = {
        departments: [], // Will be fetched from API in future
        departmentsLoading: false,
    }
    // useEffect(() => {
    //       dispatch(fetchDepartmentsAsync())
    //   }, []);

    return (
        <div className="sm:min-h-96">
            <h2 className="text-lg font-semibold mb-4">Alleged Persons</h2>
            <div className="space-y-6">
                <div className="text-end">
                    <Button className={"ml-auto"} type="button" variant={"black"} onClick={() => append({})}>
                    <Plus />
                        Alleged</Button>
                </div>
                {fields.map((field, index) => (
                    <div key={field.id} className="border p-4 rounded-md space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <TextField label="Name" {...register(`allegedPersons.${index}.name`)} error={errors?.allegedPersons?.[index]?.name?.message}  optional={true} />
                            <TextField label="Designation" {...register(`allegedPersons.${index}.designation`)} error={errors?.allegedPersons?.[index]?.designation?.message} optional={true}  />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* selectors */}
                            <ComboboxField
                                name={`allegedPersons.${index}.departmentId`}
                                label="Department"
                                placeholder={"Select department"}
                                required
                                options={selectors.departments}
                                valueKey="id"
                                labelKey="value"
                                error={errors.depa?.message}
                                isLoading={selectors.departmentsLoading}
                            />
                            <TextField label="Phone Number" {...register(`allegedPersons.${index}.phoneNumber`)} error={errors?.allegedPersons?.[index]?.phoneNumber?.message} optional={true}  />
                        </div>
                        <TextField label="Address" {...register(`allegedPersons.${index}.address`)} error={errors?.allegedPersons?.[index]?.address?.message} optional={true}  />
                        <TextField label="Additional Info" {...register(`allegedPersons.${index}.additionalInfo`)} textarea error={errors?.allegedPersons?.[index]?.additionalInfo?.message} optional={true}  />
                        <Button type="button" variant="destructive" onClick={() => remove(index)}>
                            Remove
                        </Button>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default AllegedPeronsForm;

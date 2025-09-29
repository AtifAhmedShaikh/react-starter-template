import ComboboxField from "@/components/reuseable/SearchableSelectField";
import SelectField from "../SelectField";
import TextAreaField from "@/components/reuseable/TextArea";
import { TextField } from "@/components/reuseable/TextField";
// Generic placeholders for future API integration
// import { fetchOffencesAsync, fetchTypeOfPersonsAsync, fetchZonesAsync, selectOffences, selectOffencesLoading, selectTypeOfPersons, selectTypeOfPersonsLoading, selectZones, selectZonesLoading } from "@/stores/slices/metadataSlice";
import { useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { formatCNICInput } from "@/utils/formatters";
import TextAreaWithSpeech from "@/components/reuseable/TextAreaWithSpeech";

const ComplaintDetailsForm = () => {
    const { register, formState: { errors }, setValue, control } = useFormContext();
    const dispatch = useDispatch()
    // Generic placeholders for future API integration
    const selectors = {
        offences: [], // Will be fetched from API in future
        offenceLoading: false,
        typeOfPersons: [], // Will be fetched from API in future
        typeOfPersonsLoading: false,
        zones: [], // Will be fetched from API in future
        zonesLoading: false,
    };

    // useEffect(() => {
    //     dispatch(fetchZonesAsync())
    //     dispatch(fetchOffencesAsync())
    //     dispatch(fetchTypeOfPersonsAsync())
    // }, []);


    // 🔍 Watch the selected offenceId from the form
    const selectedOffenceId = useWatch({
        control: control,
        name: "offenceId",
    });


    // 🎯 Find the selected offence object from the offences list
    const selectedOffence = selectors.offences?.find(
        (offence) => offence?.id === selectedOffenceId
    );

    const isOtherOffence = selectedOffence?.key === "other";

    // 🔍 Watch the selected typeOfPersonId from the form
    const selectedTypeOfPersonId = useWatch({
        control: control,
        name: "typeOfPersonId",
    });

    // 🎯 Find the selected type of person object from the typeOfPersons list
    const selectedTypeOfPerson = selectors.typeOfPersons?.find(
        (typeOfPerson) => typeOfPerson?.id === selectedTypeOfPersonId
    );

    const isOtherTypeOfPerson = selectedTypeOfPerson?.key === "other";

    return (
        <div className="sm:p-5 p-4 shadow-md rounded-lg border">
            <h2 className="text-lg font-semibold mb-4">Complaint Details</h2>
            <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <ComboboxField
                        name="offenceId"
                        label="Offence"
                        options={selectors.offences}
                        valueKey="id"
                        labelKey="value"
                        isLoading={selectors.offenceLoading}
                        error={errors.offenceId?.message}
                        required
                    />
                    <ComboboxField
                        name="typeOfPersonId"
                        label="Type of Person"
                        options={selectors.typeOfPersons}
                        valueKey="id"
                        labelKey="value"
                        isLoading={selectors.typeOfPersonsLoading}
                        error={errors.typeOfPersonId?.message}
                        required
                    />
                    <ComboboxField
                        name="zoneId"
                        label="Division"
                        options={selectors.zones}
                        valueKey="id"
                        labelKey="name"
                        isLoading={selectors.zonesLoading}
                        error={errors.zoneId?.message}
                        required
                    />
                </div>
                {/* ✅ Conditionally show input if offence is "Other" */}
                {isOtherOffence && (
                    <TextField
                        label="Other Offence"
                        placeholder="Specify the offence..."
                        {...register("otherOffence")}
                        error={errors.otherOffence?.message}
                        required
                        className="col-span-3"
                    />
                )}

                {/* ✅ Conditionally show input if type of person is "Other" */}
                {isOtherTypeOfPerson && (
                    <TextField
                        label="Other Type of Person"
                        placeholder="Specify the type of person..."
                        {...register("otherTypeOfPerson")}
                        error={errors.otherTypeOfPerson?.message}
                        required
                        className="col-span-3"
                    />
                )}

                <TextField label="Subject" placeholder="Type Subject..." required {...register("subject")} error={errors.subject?.message} />
                <TextAreaWithSpeech label="Summary" placeholder="Type Summary" required {...register("summary")} textarea error={errors.summary?.message} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <TextField label="Witness Name (optional)" {...register("witnessName")} error={errors.witnessName?.message} />
                    <TextField label="Witness CNIC (optional)"
                        {...register("witnessCnic", {
                            onChange: (e) => {
                                const formatted = formatCNICInput(e.target.value);
                                setValue("witnessCnic", formatted, { shouldValidate: true });
                            },
                        })}
                        error={errors.witnessCnic?.message} />
                </div>
            </div>
        </div>
    );
};

export default ComplaintDetailsForm;

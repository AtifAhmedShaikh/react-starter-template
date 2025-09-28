import ComboboxField from "@/components/reuseable/ComboboxField";
import SelectField from "../SelectField";
import TextAreaField from "@/components/reuseable/TextArea";
import { TextField } from "@/components/reuseable/TextField";
import { fetchOffencesAsync, fetchTypeOfPersonsAsync, fetchZonesAsync, selectOffences, selectOffencesLoading, selectTypeOfPersons, selectTypeOfPersonsLoading, selectZones, selectZonesLoading } from "@/stores/slices/metadataSlice";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import TextAreaWithSpeech from "@/components/reuseable/TextAreaWithSpeech";

const ComplaintDetailsForm = () => {
    const { register, formState: { errors } } = useFormContext();
    const dispatch = useDispatch()
    const selectors = {
        offences: useSelector(selectOffences),
        offenceLoading: useSelector(selectOffencesLoading),
        typeOfPersons: useSelector(selectTypeOfPersons),
        typeOfPersonsLoading: useSelector(selectTypeOfPersonsLoading),
        zones: useSelector(selectZones),
        zonesLoading: useSelector(selectZonesLoading),
    };

    useEffect(() => {
        dispatch(fetchZonesAsync())
        dispatch(fetchOffencesAsync())
        dispatch(fetchTypeOfPersonsAsync())
    }, []);

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
                <TextField label="Subject" {...register("subject")} error={errors.subject?.message} />
                <TextAreaWithSpeech placeholder="Type Summary" label="Summary" {...register("summary")} textarea error={errors.summary?.message} />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <TextField label="Witness Name (optional)" {...register("witnessName")} error={errors.witnessName?.message} />
                    <TextField label="Witness CNIC (optional)" {...register("witnessCnic")} error={errors.witnessCnic?.message} />
                </div>
            </div>
        </div>
    );
};

export default ComplaintDetailsForm;

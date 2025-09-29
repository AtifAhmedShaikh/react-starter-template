"use client";

import FilePreviewOnly from "@/components/reuseable/FilePreviewOnly";
import { selectCities } from "@/stores/slices/metadataSlice";
import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";

const ComplaintFormPreview = ({ attachments = [] }) => {
    const cities = useSelector(selectCities)
    // Generic placeholders for future API integration
    const offences = [] // Will be fetched from API in future
    const typeOfPersons = [] // Will be fetched from API in future
    const zones = [] // Will be fetched from API in future
    const departments = [] // Will be fetched from API in future
    const { getValues, register, formState: { errors } } = useFormContext();

    const data = getValues();

    // find city and department value
    const userCity = cities.find((city) => city?.id === data?.cityId);
    const offence = offences?.find((offence) => offence?.id === data?.offenceId);
    const personType = typeOfPersons?.find((type) => type?.id === data?.typeOfPersonId);
    const zone = zones?.find((z) => z?.id === data?.zoneId);

    const displayedOffence = offence?.key === "other" ? data?.otherOffence || "N/A" : offence?.value || "N/A"
    const displayedTypeOfPerson = personType?.key === "other" ? data?.otherTypeOfPerson || "N/A" : personType?.value || "N/A"

    return (
        <div className="text-muted-foreground  rounded-md">
            <div className="space-y-6 bg-white p-6 shadow-lg border rounded-md">
                <h2 className="text-2xl font-bold text-primary">Complaint Form Preview</h2>
                {/* Complainant Info */}
                <section>
                    <h3 className="text-xl font-semibold text-primary">Complainant Information</h3>
                    <div className="grid grid-cols-2 max-md:grid-cols-1 gap-2 sm:text-lg text-sm mt-3">
                        <p><strong>Full Name:</strong> {data?.fullName}</p>
                        <p><strong>CNIC:</strong> {data?.cnic}</p>
                        <p><strong>Email:</strong> {data?.email}</p>
                        <p><strong>Phone Number:</strong> {data?.phoneNumber}</p>
                        <p><strong>Address:</strong> {data?.address}</p>
                        <p><strong>City:</strong> {userCity?.name}</p>
                    </div>
                </section>

                {/* Complaint Details */}
                <section>
                    <h3 className="text-xl font-semibold text-primary">Complaint Details</h3>
                    <div className="sm:text-lg text-sm space-y-2 mt-3">
                        <p><strong>Subject:</strong> {data.subject}</p>
                        <p><strong>Summary:</strong> {data.summary}</p>
                        <p><strong>Offence:</strong> {displayedOffence}</p>
                        <p><strong>Type Of Person:</strong> {displayedTypeOfPerson}</p>
                        <p><strong>Division:</strong> {zone?.name}</p>
                        <p><strong>Witness Name:</strong> {data.witnessName}</p>
                        <p><strong>Witness CNIC:</strong> {data.witnessCnic}</p>
                    </div>
                </section>

                {/* Alleged Persons */}
                <section>
                    <h3 className="text-xl font-semibold text-primary">Alleged Persons</h3>
                    {data.allegedPersons?.length > 0 ? (
                        <ul className="space-y-4 mt-3">
                            {data.allegedPersons.map((person, index) => {
                                const department = departments.find((department) => department?.id === person?.departmentId);
                                const displayedDepartment = department?.key?.toLowerCase() === "other" && person.otherDepartment 
                                    ? person.otherDepartment 
                                    : department?.value || "Not added";

                                return (
                                    <li key={index} className="p-4 rounded-lg shadow-sm border ">
                                        <p><strong>Name:</strong> {person.name || <span className="text-xs">Not added</span>}</p>
                                        <p><strong>Designation:</strong> {person.designation || <span className="text-xs">Not added</span>}</p>
                                        <p><strong>Department:</strong> {displayedDepartment}</p>
                                        <p><strong>Mobile:</strong> {person.mobile || <span className="text-xs">Not added</span>}</p>
                                        <p><strong>Address:</strong> {person.address || <span className="text-xs">Not added</span>}</p>
                                        <p><strong>Additional Info:</strong> {person.additionalInfo || <span className="text-xs">Not added</span>}</p>
                                    </li>
                                )
                            })}
                        </ul>
                    ) : (
                        <p className="text-gray-500 text-sm">No alleged persons added.</p>
                    )}
                </section>

                <section>
                    <h3 className="text-xl font-semibold text-primary">Attached Files</h3>
                    <FilePreviewOnly files={attachments} />
                </section>


                {/* Responsibility Checkbox */}
                <div className="flex flex-col gap-2 mt-5">
                    <div className="space-x-2 flex items-center">
                        <input
                            type="checkbox"
                            id="truth"
                            {...register("truthConfirmation")}
                            className="h-4 w-4"
                        />
                        <label htmlFor="truth" className="text-sm font-medium text-red-600">
                            All the data I submitted is truthful, and I am responsible for that.
                        </label>
                    </div>

                    <label
                        htmlFor="truth"
                        className="vazirmatn-font text-lg font-medium text-red-600 text-right"
                    >
                        جو بھی  معلومات  میں نے فراہم کیا ہے وہ سچ ہے، اور اس کا ذمہ دار میں ہوں۔
                    </label>

                    {/* Show error if checkbox not selected */}
                    {errors?.truthConfirmation && (
                        <p className="text-sm text-red-500">{errors.truthConfirmation?.message}</p>
                    )}
                </div>

            </div>
        </div>
    );
};

export default ComplaintFormPreview;

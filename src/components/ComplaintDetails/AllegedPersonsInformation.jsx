import { AlertTriangle } from 'lucide-react'
import React from 'react'

const AllegedPersonsInformation = ({ complaint = {} }) => {
    return (
        <div>
            <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-6 h-6 text-red-500" /> Alleged Persons
                </h2>
                {(complaint?.allegedPersons?.length && Array.isArray(complaint?.allegedPersons)) ? (
                    <div className="space-y-4">
                        {complaint?.allegedPersons?.map((person, i) => {
                            // Show custom department name if department is "other" and otherDepartment is provided
                            const displayedDepartment = person?.department?.key?.toLowerCase() === "other" && person?.otherDepartment 
                                ? person?.otherDepartment 
                                : person?.department?.value || "N/A";

                            return (
                                <div key={i} className="border rounded-xl p-5 bg-gray-50 shadow-sm">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-600">
                                        <p className="break-words overflow-hidden"><strong>Name:</strong> {person?.fullName || "N/A"}</p>
                                        <p className="break-words overflow-hidden"><strong>Designation:</strong> {person?.designation || "N/A"}</p>
                                        <p className="break-words overflow-hidden"><strong>Department:</strong> {displayedDepartment}</p>
                                        <p className="break-words overflow-hidden"><strong>Mobile:</strong> {person?.mobileNumber || "N/A"}</p>
                                        <p className="md:col-span-2 break-words overflow-hidden"><strong>Address:</strong> {person?.address || "N/A"}</p>
                                        <p className="md:col-span-2 break-words overflow-hidden"><strong>Additional Info:</strong> {person?.additionalInfo || "N/A"}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <p className="text-gray-500">No alleged persons</p>
                )}
            </section>
        </div>
    )
}

export default AllegedPersonsInformation
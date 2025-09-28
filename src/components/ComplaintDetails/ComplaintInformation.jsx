import { PermissionKeys } from '@/constants/permissions'
import { usePermissions } from '@/hooks/usePermissions'
import { formatDate } from '@/utils/formatters'
import { FileText } from 'lucide-react'
import StatusBadge from '../reuseable/StatusBadge'
import SimilarComplaintsDialog from './SimilarComplaintModel'
import { isUrdu } from '@/utils/helper'

const ComplaintInformation = ({ complaint = {} }) => {
    const { hasPermission } = usePermissions()

    const displayedOffence = complaint?.offence?.key === "other" ? complaint?.otherOffence || "N/A" : complaint?.offence?.value || "N/A"
    const displayTypeOfPerson = complaint?.typeOfPerson?.key == "other" ?   complaint?.otherTypeOfPerson || "N/A" :  complaint?.typeOfPerson?.value
    const canViewOldRef = hasPermission(PermissionKeys.can_view_old_refno)
    
    
    return (
        <section className="mb-8 border-b pb-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <FileText className="w-6 h-6 text-primary" /> Complaint Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
                <p><strong>Reference No:</strong> {complaint?.refNo}</p>
                {canViewOldRef && complaint?.oldRefNo && (
                    <p><strong>Old Reference No:</strong> {complaint?.oldRefNo}</p>
                )}
                <div className="md:col-span-2 sm:text-xl text-primary font-bold break-words">
                    <div className="font-bold">Subject:</div>
                    <div className={`mt-1 leading-relaxed ${isUrdu(complaint?.subject) ? "font-nastaliq" : "font-sans"}`}>{complaint?.subject}</div>
                </div>
                {hasPermission(PermissionKeys.can_view_similar_complaints) ? (
                    <SimilarComplaintsDialog complaintId={complaint?.id} />
                ): null}
                <div className="md:col-span-2 break-words">
                    <div className="font-bold">Summary:</div>
                    <div className={`mt-1 leading-relaxed ${isUrdu(complaint?.summary) ? "font-nastaliq" : "font-sans"}`}>{complaint?.summary}</div>
                </div>
                <p className="md:col-span-2 break-words overflow-hidden"><strong>Offence:</strong> {displayedOffence}</p>
                <p className="md:col-span-2 break-words overflow-hidden"><strong>Type of Person:</strong> {displayTypeOfPerson}</p>
                <p><strong>Status:</strong> <StatusBadge status={complaint?.status} /></p>
                <p><strong>Lodged At:</strong> {formatDate(complaint?.createdAt)}</p>
                <p><strong>Last Updated:</strong> {formatDate(complaint?.updatedAt)}</p>
                <p className="break-words overflow-hidden"><strong>Witness Name:</strong> {complaint?.witness?.[0]?.name || "N/A"}</p>
                <p className="break-words overflow-hidden"><strong>Witness CNIC:</strong> {complaint?.witness?.[0]?.cnic || "N/A"}</p>
                <p className="break-words overflow-hidden">
                    <strong>Division:</strong>{" "}
                    {complaint?.zone?.name
                        ? complaint.zone.name.replace(/zone/gi, "").trim() || "N/A"
                        : "N/A"}
                </p>
            </div>
        </section>
    )
}

export default ComplaintInformation
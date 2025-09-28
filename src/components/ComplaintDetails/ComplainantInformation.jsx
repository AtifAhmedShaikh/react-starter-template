import { Button } from '@/components/ui/button'
import { PermissionKeys } from '@/constants/permissions'
import { usePermissions } from '@/hooks/usePermissions'
import { ArrowRight, CreditCard, Home, LinkIcon, Mail, MapPin, Phone, User, UserCircle } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

const ComplainantInformation = ({ complaint = {}, handleModalOpen }) => {
    const navigate = useNavigate()
    const { hasPermission } = usePermissions()
    return (
        <section className="mb-8 border-b pb-6">
            <h2 className="sm:text-2xl text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <User className="w-6 h-6 text-primary" /> Complainant Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
                <p className="flex items-center gap-2 break-words overflow-hidden">
                    <User className="w-4 h-4 flex-shrink-0" />
                    <span className="font-semibold">Name:</span> {complaint?.user?.fullName}
                    {hasPermission(PermissionKeys.can_view_complainant_profile) && (
                   <span className={"ml-2 flex"}>
                   ( <Link to={`/complainant-profile/${complaint?.user?.id}`} className={"text-primary flex gap-1 items-center  underline "} >
                        View Profile
                    </Link>)
                   </span>
                )}
                </p>
                <p className="flex items-center gap-2 break-words overflow-hidden">
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    <span className="font-semibold">Email:</span> {complaint?.user?.email}
                </p>
                <p className="flex items-center gap-2 break-words overflow-hidden">
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    <span className="font-semibold">Phone:</span> {complaint?.user?.phoneNumber}
                </p>
                <p className="flex items-center gap-2 break-words overflow-hidden">
                    <CreditCard className="w-4 h-4 flex-shrink-0" />
                    <span className="font-semibold">CNIC:</span> {complaint?.user?.cnic}
                </p>
                <p className="flex items-center gap-2 break-words overflow-hidden">
                    <UserCircle className="w-4 h-4 flex-shrink-0" />
                    <span className="font-semibold">Gender:</span> {complaint?.user?.gender}
                </p>
                <p className="flex items-center gap-2 break-words overflow-hidden">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="font-semibold">City:</span> {complaint?.user?.city?.name}
                </p>
                <div className="flex flex-wrap items-center gap-2 max-w-sm md:max-w-full break-words overflow-hidden">
                    <Home className="w-4 h-4 flex-shrink-0" />
                    <span className="font-semibold">Address:</span>
                    <p className="w-full break-words overflow-hidden">
                        {complaint?.user?.address}
                    </p>
                </div>
        
                {/* {hasPermission(PermissionKeys.can_view_complainant_profile) && (
                    <Button className={"justify-between max-w-64 ml-auto"} onClick={() => navigate(`/complainant-profile/${complaint?.user?.id}`)} >
                        View Profile
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                    //     <Button variant="outline" onClick={() => handleModalOpen("groupComplaints")}>
                    //     Group Complaints
                    // </Button>
                )} */}
                {hasPermission(PermissionKeys.can_group_complaints) && (
                    <Button variant="default" onClick={() => handleModalOpen("groupComplaints")} className={"max-w-fit ml-0"}>
                        Group Complaints
                    </Button>
                )}
            </div>

        </section>
    )
}

export default ComplainantInformation
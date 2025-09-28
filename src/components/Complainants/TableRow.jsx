import { TableCell, TableRow } from "@/components/ui/table";
import { useNavigate } from 'react-router-dom';

export default function ComplainantRow({ user, serialNumber = "" }) {
    const navigate = useNavigate();
    
    return (
        <TableRow 
            className={`[&_td]:sm:!py-3 sm:text-xs cursor-pointer hover:bg-primary/80 hover:!text-white`} 
            onClick={() => navigate(`/complainant-profile/${user?.id}`)}
        >
            <TableCell>{serialNumber}</TableCell>
            <TableCell>{user?.cnic}</TableCell>
            <TableCell>{user?.fullName}</TableCell>
            <TableCell>{user?.phoneNumber}</TableCell>
            <TableCell>{user?.email || "-"}</TableCell>
            <TableCell>{user?.gender}</TableCell>
            <TableCell>{user?.city?.name || "-"}</TableCell>
        </TableRow>
    );
}

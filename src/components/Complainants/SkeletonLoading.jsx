import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function SkeletonLoading() {
    return (
        <div className="space-y-4">
            <div className="flex justify-between m-1">
                <Skeleton className="h-10 w-64" />
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-primary">
                            <TableHead className="text-white">S. No</TableHead>
                            <TableHead className="text-white">CNIC</TableHead>
                            <TableHead className="text-white">Full Name</TableHead>
                            <TableHead className="text-white">Phone Number</TableHead>
                            <TableHead className="text-white">Email</TableHead>
                            <TableHead className="text-white">Gender</TableHead>
                            <TableHead className="text-white">City</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {[...Array(10)].map((_, i) => (
                            <TableRow key={i}>
                                <TableCell><Skeleton className="h-4 w-8" /></TableCell>
                                <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                                <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                                <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                                <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                                <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                                <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className="flex justify-center">
                <Skeleton className="h-8 w-64" />
            </div>
        </div>
    );
}

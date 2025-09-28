import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useComplainantsData } from "@/hooks/useComplainantsData";
import { Loader } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import GlobalSearchInput from "../reuseable/GlobalSearchInput";
import PaginationControls from "./TablePaginationControl";
import ComplainantRow from "./TableRow";
import { parsePageSafely } from "@/utils/pagination";

export default function ComplainantsTable({ apiFn, queryName = "complainants", extraParams = {}, children }) {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("keyword") || "";
    const page = parsePageSafely(searchParams.get("page"));
    console.log("Getting the page number", page);
    const { complainants = [], meta, loading, error } = useComplainantsData({ queryName, apiFn, keyword, page, extraParams });

    return (
        <div className="space-y-4">
            <div className="flex justify-between m-1">
                <GlobalSearchInput placeholder="Search by name, cnic, phone number" />
            </div>
            {
                children
            }
            <div className="rounded-md border md:!max-w-[calc(100vw-22rem)] max-w-[calc(100vw-3rem)] mx-auto mt-2 ">
                <Table className={`overflow-hidden w-full  [&_th]:border-white [&_th]:!border-2 [&_th]:!p-2 [&_td]:!p-2 [&_td]:border-gray-100 [&_td]:!border-2`}>
                    <TableHeader>
                        <TableRow className="bg-primary [&_*]:!text-white hover:!bg-primary py-2">
                            <TableHead>S. No</TableHead>
                            <TableHead>CNIC</TableHead>
                            <TableHead>Full Name</TableHead>
                            <TableHead>Phone Number</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Gender</TableHead>
                            <TableHead>City</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            {error && <td colSpan={7} className="text-center py-4 text-red-600">
                                {error}
                            </td>}
                        </TableRow>
                        {loading && (
                            <TableRow>
                                <td colSpan={7} className="text-center py-4 "><span className="flex items-center justify-center gap-5"> <Loader className="animate-spin" />Loading...</span></td>
                            </TableRow>
                        )}
                        {!loading && !error && complainants.length === 0 && (
                            <TableRow>
                                <td colSpan={7} className="text-center py-4">No complainants found.</td>
                            </TableRow>
                        )}
                        {!loading && !error && complainants.map((c, index) => {
                            const serialNumber = (meta?.limit || 10) * ((meta?.page || 1) - 1) + index + 1;
                            return <ComplainantRow key={c.id} serialNumber={serialNumber} user={c} searchKeyword={keyword} />;
                        })}
                    </TableBody>
                </Table>
            </div>

            <div className="flex justify-center w-full px-2 sm:px-4">
                <PaginationControls currentPage={meta?.page} totalPages={meta?.totalPages} />
            </div>
        </div>
    );
}

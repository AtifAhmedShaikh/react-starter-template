import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useComplaintData } from "@/hooks/useComplaints";
import { fetchStatusAsync } from "@/stores/slices/metadataSlice";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import PaginationControls from "../ComplaintsTable/TablePaginationControl";
import ComplaintSort from "../reuseable/ComplaintSorting";
import GlobalSearchInput from "../reuseable/GlobalSearchInput";
import ComplaintTableRow from "../ComplaintsTable/TableRow";
import { parsePageSafely } from "@/utils/pagination";

export default function TrackOpenComplaintsTable({ apiFn, queryName = "track_open_complaints", extraParams = {}, shouldSortBy = true }) {
    const [searchParams] = useSearchParams();
    const keyword = searchParams.get("keyword") || "";
    const page = parsePageSafely(searchParams.get("page"));
    const sortBy = searchParams.get("sortBy") || "updatedAt";
    const order = searchParams.get("order") || "desc";

    const { complaints=[], meta, loading, error } = useComplaintData({queryName, apiFn, keyword, page, sortBy, order, extraParams });
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchStatusAsync());
    }, [dispatch]);

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
                <GlobalSearchInput />
                {shouldSortBy && <ComplaintSort />}
            </div>

            <div className="rounded-md border md:!max-w-[calc(100vw-22rem)] max-w-[calc(100vw-2.4rem)] mx-auto ">
                <Table className={`overflow-hidden w-full  [&_th]:border-white [&_th]:!border-2 [&_th]:!p-2 [&_td]:!p-2 [&_td]:border-gray-100 [&_td]:!border-2`}>
                    <TableHeader>
                        <TableRow className="bg-primary [&_*]:!text-white hover:!bg-primary py-2">
                            {/* <TableHead>User Profile</TableHead> */}
                            <TableHead>Ref No</TableHead>
                            <TableHead>Subject</TableHead>
                            {/* <TableHead>Zone</TableHead> */}
                            <TableHead>Submission Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Last Updated</TableHead>
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
                        {!loading && !error && complaints.length === 0 && (
                            <TableRow>
                                <td colSpan={7} className="text-center py-4">No open complaints found.</td>
                            </TableRow>
                        )}
                        {!loading && !error && complaints.map(c => (
                            <ComplaintTableRow key={c.id} complaint={c} searchKeyword={keyword} />
                        ))}
                    </TableBody>
                </Table>
            </div>

            <PaginationControls currentPage={meta?.page} totalPages={meta?.totalPages} />
        </div>
    );
}

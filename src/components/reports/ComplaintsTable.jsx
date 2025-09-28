import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader } from "lucide-react";
import PaginationControls from "../ComplaintsTable/TablePaginationControl";
import ComplaintTableRow from "../ComplaintsTable/TableRow";
import GlobalSearchInput from "../reuseable/GlobalSearchInput";

export default function ComplaintsTableForReports({
  data = [],
  meta = { page: 1, totalPages: 1 },
  loading = false,
  error = null,
}) {
  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex flex-wrap gap-2">
      <GlobalSearchInput />
      </div>

      {/* Table */}
      <div className="rounded-md border md:!max-w-[calc(100vw-22rem)] max-w-[calc(100vw-2.4rem)] mx-auto ">
      <Table
          className={`overflow-hidden w-full  [&_th]:border-white [&_th]:!border-2 [&_th]:!p-2 [&_td]:!p-2 [&_td]:border-gray-100 [&_td]:!border-2`}
        >
          <TableHeader>
            <TableRow className="bg-primary [&_*]:!text-white hover:!bg-primary py-2">
              <TableHead>Ref No</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Submission Date</TableHead>
              <TableHead>Complaint Status</TableHead>
              <TableHead>Last Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Error State */}
            {error && (
              <TableRow>
                <td colSpan={5} className="text-center py-4 text-red-600">
                  {error}
                </td>
              </TableRow>
            )}

            {/* Loading State */}
            {loading && (
              <TableRow>
                <td colSpan={5} className="text-center py-4 ">
                  <span className="flex items-center justify-center gap-5">
                    <Loader className="animate-spin" />
                    Loading...
                  </span>
                </td>
              </TableRow>
            )}

            {/* Empty State */}
            {!loading && !error && data.length === 0 && (
              <TableRow>
                <td colSpan={5} className="text-center py-4">
                  No complaints found.
                </td>
              </TableRow>
            )}

            {/* Data Rows */}
            {!loading &&
              !error &&
              data.map((c) => <ComplaintTableRow key={c.id} complaint={c} />)}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
        <PaginationControls
          currentPage={meta?.currentPage}
          totalPages={meta?.totalPages}
        />
    </div>
  );
}

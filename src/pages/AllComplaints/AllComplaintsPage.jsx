
import ComplaintTable from "@/components/ComplaintsTable/ComplaintsTable";
import AdvancedFilters from "@/components/reuseable/AdvanceFilters";
import { COMPLAINT_QUERY_NAME } from "@/constants";
import { COMPLAINT_APIS } from "@/constants/APIs";
import { axiosInstance } from "@/lib/axiosInstance";
import { useState } from "react";
import { useSearchParams } from 'react-router-dom';



const fetchAllComplaints = async ({ keyword, page, limit, ...params }) => {
  const res = await axiosInstance.post(COMPLAINT_APIS.GET_ALL_COMPALINTS, {
    keyword, page, limit, ...params
  });
  return res.data;
};

export default function AllComplaintsPage() {
  const [searchParams] = useSearchParams();
  // Local state for filters (pulled from query params initially)
  const [filters, setFilters] = useState({
    dateRange: {
      from: searchParams.get("from") ? new Date(searchParams.get("from")) : "",
      to: searchParams.get("to") ? new Date(searchParams.get("to")) : "",
    },
    offenceIds: searchParams.get("offenceIds")?.split(",") || [],
    zoneIds: searchParams.get("zoneIds")?.split(",") || [],
    departmentIds: searchParams.get("departmentIds")?.split(",") || [],
    typeOfPersonIds: searchParams.get("typeOfPersonIds")?.split(",") || [],
    statusIds: searchParams.get("statusIds")?.split(",") || [],
  });

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">All Complaints</h1>
      <AdvancedFilters
        filters={filters}
        setFilters={setFilters}
        onApply={(params) => {
          if (!params) return;
          setFilters(params);
        }}
      />
      <ComplaintTable
        apiFn={fetchAllComplaints}
        queryName={COMPLAINT_QUERY_NAME.all_complaints}
        extraParams={filters}
        shouldSortBy={false}
      />
    </div>
  );
}

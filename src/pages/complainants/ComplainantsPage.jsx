import ComplainantsTable from "@/components/Complainants/ComplainantsTable";
import { ADMIN_APIS } from "@/constants/APIs";
import { axiosInstance } from "@/lib/axiosInstance";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useSearchParams } from 'react-router-dom';

const fetchComplainants = async ({ keyword, page, limit }) => {
    const res = await axiosInstance.get(ADMIN_APIS.GET_COMPLAINANTS, {
        params: { keyword, page, limit }
    });
    return res.data;
};

export default function ComplainantsPage() {
    const [searchParams] = useSearchParams();
    // Local state for filters (pulled from query params initially)
    const [filters, setFilters] = useState({});

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Complainants - Anti-Corruption Establishment Sindh</title>
                <meta property="og:title" content="Complainants & Anti-Corruption Establishment Sindh." />
            </Helmet>
            <div>
                <h1 className="text-xl font-semibold mb-4">All Complainants</h1>
                <ComplainantsTable 
                    apiFn={fetchComplainants}
                    extraParams={filters}
                />
            </div>
        </>
    );
}

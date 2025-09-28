

import AdminsTable from "@/components/Admins/AdminsTable";
import Filters from "@/components/Admins/Filters";
import { ADMIN_APIS } from "@/constants/APIs";
import { axiosInstance } from "@/lib/axiosInstance";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useSearchParams } from 'react-router-dom';



const fetchAdminUsers = async ({ keyword, page, limit, roles = [], cities = [[]] }) => {
    const res = await axiosInstance.get(ADMIN_APIS.GET_ADMINS, {
        params: { keyword, page, limit, roles, cities }
    });
    return res.data;
};

export default function AdminUsersPage() {

    const [searchParams] = useSearchParams();
    // Local state for filters (pulled from query params initially)
    const [filters, setFilters] = useState({
        roleIds: searchParams.get("roleIds")?.split(",") || [],
        cityIds: searchParams.get("cityIds")?.split(",") || [],
    });

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Admin - Anti-Corruption Establishment Sindh</title>
                <meta property="og:title" content="Enquiries & Anti-Corruption Establishment Sindh." />
            </Helmet>
            <div>
                <h1 className="text-xl font-semibold mb-4">All Officers</h1>
                <AdminsTable apiFn={fetchAdminUsers}
                    extraParams={filters}
                />
                    {/* <Filters
                    filters={filters}
                    setFilters={setFilters}
                /> */}
                    
                    {/* </AdminsTable> */}

            </div>
        </>
    );
}

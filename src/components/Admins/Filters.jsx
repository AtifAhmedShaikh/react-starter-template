import MultiSelectField from "@/components/reuseable/MultiSelectField";
import { Button } from "@/components/ui/button";
import { fetchCitiesAsync, selectCities } from "@/stores/slices/metadataSlice";
// Generic placeholders for future API integration
// import { fetchRolesAsync, selectRoles, selectRolesLoading } from "@/stores/slices/metadataSlice";
import { X as XCircle } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

export default function Filters({ filters, setFilters }) {
    const [_, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();

    const cities = useSelector(selectCities);

    // Generic placeholders for future API integration
    const roles = []; // Will be fetched from API in future
    const rolesLoading = false;

    useEffect(() => {
        dispatch(fetchCitiesAsync()); // should fetch only level 3
        // dispatch(fetchRolesAsync());
    }, [dispatch]);

    const updateFilter = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const removeFilter = (key, value) => {
        updateFilter(key, filters[key].filter((v) => v !== value));
    };

    // not used
    const applyFilters = () => {
        const params = {};
        Object.entries(filters).forEach(([key, value]) => {
            if (Array.isArray(value) && value.length) {
                params[key] = value.join(",");
            }
        });
        setSearchParams(params);
    };

    const handleClearFilters = () => {
        setFilters({
            roles: [],
            cities: [],
        });
        setSearchParams({});
    };

    const getLabelById = (id, list, labelKey = "name") =>
        list?.find((item) => item.id === id)?.[labelKey] || id;

    return (
        <div className="">
            <div>
                <div className="grid sm:grid-cols-2 gap-3">
                    <MultiSelectField
                        label="Roles"
                        options={roles}
                        isLoading={rolesLoading}
                        valueKey="id"
                        labelKey="value"
                        value={filters.roles}
                        onChange={(val) => updateFilter("roles", val)}
                    />

                    <MultiSelectField
                        label="Cities"
                        options={cities.data}
                        isLoading={cities.loading}
                        valueKey="id"
                        labelKey="value"
                        value={filters.cities}
                        onChange={(val) => updateFilter("cities", val)}
                    />
                </div>
            </div>

            <div className="flex flex-wrap gap-2 m-0 font-semibold">
                {Array.isArray(filters?.roles) ? filters.roles.map((id) => (
                    <Tag
                        key={id}
                        label={`Role: ${getLabelById(id, roles, "value")}`}
                        onRemove={() => removeFilter("roles", id)}
                    />
                )):""}
                {Array.isArray(filters?.cities) ? filters.cities.map((id) => (
                    <Tag
                        key={id}
                        label={`City: ${getLabelById(id, cities, "value")}`}
                        onRemove={() => removeFilter("cities", id)}
                    />
                )) : ""}
            </div>
            <div className="flex justify-end gap-3 m-0">
                <Button variant="link" className={"text-destructive sm:cursor-pointer"} onClick={handleClearFilters}>Clear Filters</Button>
            </div>
        </div>
    );
}

function Tag({ label, onRemove }) {
    return (
        <div className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full flex items-center gap-2">
            {label}
            <XCircle className="w-4 h-4 cursor-pointer" onClick={onRemove} />
        </div>
    );
}

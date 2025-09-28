import MultiSelectField from "@/components/reuseable/MultiSelectField";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { PermissionKeys } from "@/constants/permissions";
import { usePermissions } from "@/hooks/usePermissions";
import { fetchDepartmentsAsync, fetchOffencesAsync, fetchStatusAsync, fetchTypeOfPersonsAsync, fetchZonesAsync, selectOffences, selectOffencesLoading, selectStatus, selectStatusLoading, selectTypeOfPersons, selectTypeOfPersonsLoading, selectZones, selectZonesLoading } from "@/stores/slices/metadataSlice";
import { PlusCircle, X as XCircle } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

export default function AdvancedFilters({ onApply, filters, setFilters }) {
    const { hasPermission } = usePermissions();
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();

    const offences = useSelector(selectOffences);
    const offenceLoading = useSelector(selectOffencesLoading);
    const typeOfPersons = useSelector(selectTypeOfPersons);
    const typeOfPersonsLoading = useSelector(selectTypeOfPersonsLoading);
    const zones = useSelector(selectZones);
    const zonesLoading = useSelector(selectZonesLoading);
    const statuses = useSelector(selectStatus);
    const statusesLoading = useSelector(selectStatusLoading);

    useEffect(() => {
        dispatch(fetchZonesAsync());
        dispatch(fetchOffencesAsync());
        dispatch(fetchTypeOfPersonsAsync());
        dispatch(fetchStatusAsync());
        dispatch(fetchDepartmentsAsync())

    }, [dispatch]);

    const updateFilter = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const removeFilter = (key, value) => {
        if (Array.isArray(filters[key])) {
            updateFilter(key, filters[key].filter((v) => v !== value));
        } else {
            updateFilter(key, "");
        }
    };

    const applyFilters = () => {
        const params = {};
        Object.entries(filters).forEach(([key, value]) => {
            if (Array.isArray(value) && value.length) {
                params[key] = value.join(",");
            } else if (typeof value === "object" && key === "dateRange") {
                if (value.from) params.from = value.from.toISOString();
                if (value.to) params.to = value.to.toISOString();
            } else if (value) {
                params[key] = value;
            }
        });
        setSearchParams(params);
        onApply?.(filters); // callback fucntion to the parent
    };

    const handleClearFilters = () => {
        console.log(searchParams)
        setFilters({
            keyword: "",
            dateRange: { from: "", to: "" },
            offenceIds: [],
            zoneIds: [],
            departmentIds: [],
            typeOfPersonIds: [],
            statusIds: [],
        });
        setSearchParams({});
        onApply?.(null);
    };

    const getLabelById = (id, list, type = "value") =>
        list?.find((item) => item.id === id)?.[type] || id;

    return (
        <Card className="sm:p-4 px-2 space-y-4 my-3">
            <CardHeader className="p-0">
                <CardTitle className="text-lg font-semibold">Advanced Filters</CardTitle>
            </CardHeader>

            <CardContent>
                <div className="grid sm:grid-cols-3 gap-3">
                    <div>
                        <label className="block text-sm font-medium mb-2">Date Range</label>
                        <DateRangePicker
                            value={filters.dateRange}
                            onChange={(range) => updateFilter("dateRange", range)}
                            className="border-primary/60 hover:border-primary/80 hover:bg-primary/10"
                        />
                    </div>
                    <MultiSelectField
                        label="Statuses"
                        options={statuses}
                        isLoading={statusesLoading}
                        valueKey="id"
                        labelKey={hasPermission(PermissionKeys.can_view_admin_label) ? "adminLabel" : "userLabel"}
                        value={filters.statusIds}
                        onChange={(val) => updateFilter("statusIds", val)}
                    />
                    <MultiSelectField
                        label="Divisions"
                        options={zones}
                        isLoading={zonesLoading}
                        valueKey="id"
                        labelKey="name"
                        value={filters.zoneIds}
                        onChange={(val) => updateFilter("zoneIds", val)}
                    />
                </div>

                <div className="grid sm:grid-cols-2 my-4 gap-3">
                    <MultiSelectField
                        label="Offences"
                        options={offences}
                        isLoading={offenceLoading}
                        value={filters.offenceIds}
                        onChange={(val) => updateFilter("offenceIds", val)}
                    />

                    <MultiSelectField
                        label="Type Of Person"
                        options={typeOfPersons}
                        isLoading={typeOfPersonsLoading}
                        valueKey="id"
                        labelKey="value"
                        value={filters.typeOfPersonIds}
                        onChange={(val) => updateFilter("typeOfPersonIds", val)}
                    />

                </div>
            </CardContent>

            <div className="flex flex-wrap gap-2 font-semibold">
                {filters.keyword && (
                    <Tag label={`Keyword: ${filters.keyword}`} onRemove={() => removeFilter("keyword")} />
                )}
                {filters?.dateRange?.from && filters?.dateRange?.to && (
                    <Tag
                        label={`Date: ${filters?.dateRange?.from?.toLocaleDateString()} → ${filters?.dateRange?.to?.toLocaleDateString()}`}
                        onRemove={() => updateFilter("dateRange", { from: "", to: "" })}
                    />
                )}

                {filters.offenceIds.map((id) => (
                    <Tag
                        key={id}
                        label={`Offence: ${getLabelById(id, offences)}`}
                        onRemove={() => removeFilter("offenceIds", id)}
                    />
                ))}

                {filters.statusIds.map((id) => (
                    <Tag
                        key={id}
                        label={`Status: ${getLabelById(id, statuses, hasPermission(PermissionKeys.can_view_admin_label) ? "adminLabel" : "userLabel")}`}
                        onRemove={() => removeFilter("statusIds", id)}
                    />
                ))}

                {filters.zoneIds.map((id) => (
                    <Tag
                        key={id}
                        label={`Division: ${getLabelById(id, zones, "name")}`}
                        onRemove={() => removeFilter("zoneIds", id)}
                    />
                ))}
                {filters.typeOfPersonIds.map((id) => (
                    <Tag
                        key={id}
                        label={`Type Of Person: ${getLabelById(id, typeOfPersons)}`}
                        onRemove={() => removeFilter("typeOfPersonIds", id)}
                    />
                ))}

            </div>

            <div className="flex justify-end gap-3">
                <Button variant="link" onClick={handleClearFilters} className={"hover:underline cursor-pointer"}>Clear Filters</Button>
                {/* <Button onClick={applyFilters}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Apply Filters
                </Button> */}
            </div>
        </Card>
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

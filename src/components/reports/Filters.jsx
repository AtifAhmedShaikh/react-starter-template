import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Input } from "@/components/ui/input";
import { PermissionKeys } from "@/constants/permissions";
import { usePermissions } from "@/hooks/usePermissions";
// Generic placeholders for future API integration
// import {
//   fetchDepartmentsAsync,
//   fetchOffencesAsync,
//   fetchStatusAsync,
//   fetchTypeOfPersonsAsync,
//   fetchZonesAsync,
//   selectDepartments,
//   selectDepartmentsLoading,
//   selectOffences,
//   selectOffencesLoading,
//   selectStatus,
//   selectStatusLoading,
//   selectTypeOfPersons,
//   selectTypeOfPersonsLoading,
//   selectZones,
//   selectZonesLoading
// } from "@/stores/slices/metadataSlice";
import { clearFilters, fetchReportsAsync, selectReports, setFilters } from "@/stores/slices/reportsSlice";
import { PlusCircle, X as XCircle } from "lucide-react";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import MultiSelectField from "../reuseable/MultiSelectField";
import DownloadReportPdf from "./ReportPdf";

export default function AdvancedFilters() {
  const dispatch = useDispatch();
  const { hasPermission } = usePermissions();
  const [_searchParams, setSearchParams] = useSearchParams();

  // Generic placeholders for future API integration
  const offences = []; // Will be fetched from API in future
  const offenceLoading = false;
  const typeOfPersons = []; // Will be fetched from API in future
  const typeOfPersonsLoading = false;
  const zones = []; // Will be fetched from API in future
  const zonesLoading = false;
  const statuses = []; // Will be fetched from API in future
  const statusesLoading = false;
  const departments = []; // Will be fetched from API in future
  const departmentsLoading = false;

  // useEffect(() => {
  //   dispatch(fetchZonesAsync());
  //   dispatch(fetchOffencesAsync());
  //   dispatch(fetchTypeOfPersonsAsync());
  //   dispatch(fetchStatusAsync());
  //   dispatch(fetchDepartmentsAsync())
  // }, [dispatch]);


  const { filters, loading: generatingReports } = useSelector(selectReports);
  const methods = useForm();

  // Update a single filter key in Redux
  const updateFilter = (key, value) => {
    if (key === "dateRange" && value) {
      dispatch(setFilters({
        dateRange: {
          from: value?.from ? value?.from?.toISOString() : "",
          to: value?.to ? value?.to?.toISOString() : ""
        }
      }));
    } else {
      dispatch(setFilters({ [key]: value }));
    }
  };
  //FIXME - will remove it later
  // const toggleMultiSelect = (key, value) => {
  //   const current = filters[key] || [];
  //   if (current.includes(value)) {
  //     dispatch(setFilters({ [key]: current.filter((v) => v !== value) }));
  //   } else {
  //     dispatch(setFilters({ [key]: [...current, value] }));
  //   }
  // };

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
      if (value && (Array.isArray(value) ? value.length > 0 : value !== "")) {
        params[key] = Array.isArray(value) ? value.join(",") : value;
      }
    });
    setSearchParams(params);
    dispatch(fetchReportsAsync());
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const getLabelById = (id, list, type = "value") => {
    console.log({ id, list, type })
    const label = list?.find((item) => item.id === id)?.[type] || id;
    return label;
  };

  return (
    <Card className="sm:p-4 p-2 space-y-4">
      <CardHeader className="p-0">
        <CardTitle className="text-lg font-semibold">Advanced Filters</CardTitle>
      </CardHeader>

      <CardContent>
        <FormProvider {...methods}>


          <div className="grid sm:grid-cols-4 gap-3">
            {/* Keyword Search */}
            <div className="col-span-3">
              <label className="block text-sm font-medium mb-1">Keyword</label>
              <Input
                placeholder="Search..."
                value={filters.keyword}
                onChange={(e) => updateFilter("keyword", e.target.value)}
                className={"border-2 border-primary/60 hover:border-primary/80 hover:bg-primary/10"}
              />
            </div>

            {/* Date Range Picker */}
            <div>
              <label className="block text-sm font-medium mb-1">Date Range</label>
              <DateRangePicker
                value={{
                  from: filters?.dateRange?.from ? new Date(filters?.dateRange?.from) : undefined,
                  to: filters?.dateRange?.to ? new Date(filters?.dateRange?.to) : undefined
                }}
                onChange={(range) => updateFilter("dateRange", range)}
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-4 gap-2 my-3">
            <Button
              variant="primaryBorder"
              size="sm"
              onClick={() =>
                updateFilter("dateRange", {
                  from: new Date(new Date().setMonth(new Date().getMonth() - 1)),
                  to: new Date()
                })
              }
            >
              1 Month
            </Button>
            <Button
              variant="primaryBorder"
              size="sm"
              onClick={() =>
                updateFilter("dateRange", {
                  from: new Date(new Date().setMonth(new Date().getMonth() - 3)),
                  to: new Date()
                })
              }
            >
              3 Months
            </Button>
            <Button
              variant="primaryBorder"
              size="sm"
              onClick={() =>
                updateFilter("dateRange", {
                  from: new Date(new Date().setMonth(new Date().getMonth() - 6)),
                  to: new Date()
                })
              }
            >
              6 Months
            </Button>
            <Button
              variant="primaryBorder"
              size="sm"
              onClick={() =>
                updateFilter("dateRange", {
                  from: new Date(new Date().getFullYear(), 0, 1),
                  to: new Date()
                })
              }
            >
              1 Year
            </Button>
          </div>


          {/* Multi-selects */}
          <div className="grid sm:grid-cols-2 my-4 gap-3">

            <MultiSelectField
              name="offenceIds"
              label="Offences"
              placeholder="Select offence(s)"
              options={offences}
              isLoading={offenceLoading}
              value={filters.offenceIds}
              onChange={(val) => updateFilter("offenceIds", val)}
            />

            <MultiSelectField
              name="zoneIds"
              label="Divisions"
              placeholder="Select division(s)"
              options={zones}
              isLoading={zonesLoading}
              valueKey="id"
              labelKey="name"
              value={filters.zoneIds}
              onChange={(val) => updateFilter("zoneIds", val)}
            />

            <MultiSelectField
              name="departmentIds"
              label="Department"
              placeholder="Select department(s)"
              options={departments}
              isLoading={departmentsLoading}
              valueKey="id"
              labelKey="value"
              value={filters.departmentIds}
              onChange={(val) => updateFilter("departmentIds", val)}
            />

            <MultiSelectField
              name="typeOfPersonIds"
              label="Type Of Person"
              placeholder="Select type(s)"
              options={typeOfPersons}
              isLoading={typeOfPersonsLoading}
              valueKey="id"
              labelKey="value"
              value={filters.typeOfPersonIds}
              onChange={(val) => updateFilter("typeOfPersonIds", val)}
            />

            <MultiSelectField
              name="statusIds"
              label="Statuses"
              placeholder="Select type(s)"
              options={statuses}
              isLoading={statusesLoading}
              valueKey="id"
              labelKey={hasPermission(PermissionKeys.can_view_admin_label) ? "adminLabel" : "userLabel"}
              value={filters.statusIds}
              onChange={(val) => updateFilter("statusIds", val)}
            />

          </div>
        </FormProvider>
      </CardContent>

      {/* Active Filters Tags */}
      <div className="flex flex-wrap gap-2 font-semibold">
        {filters.dateRange?.from && filters.dateRange?.to && (
          <div className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full flex items-center gap-2">
            Date: {filters.dateRange.from && new Date(filters.dateRange.from).toLocaleDateString()} → {filters.dateRange.to && new Date(filters.dateRange.to).toLocaleDateString()}
            <XCircle
              className="w-4 h-4 cursor-pointer"
              onClick={() => updateFilter("dateRange", { from: "", to: "" })}
            />
          </div>
        )}

        {filters?.keyword && (
          <div className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full flex items-center gap-2">
            Keyword: {filters.keyword}
            <XCircle
              className="w-4 h-4 cursor-pointer"
              onClick={() => removeFilter("keyword")}
            />
          </div>
        )}

        {Array.isArray(filters?.offenceIds) && filters?.offenceIds.map((id) => (
          <div
            key={id}
            className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full flex items-center gap-2"
          >
            Offence: {getLabelById(id, offences)}
            <XCircle
              className="w-4 h-4 cursor-pointer"
              onClick={() => removeFilter("offenceIds", id)}
            />
          </div>
        ))}

        {Array.isArray(filters?.zoneIds) && filters?.zoneIds.map((id) => (
          <div
            key={id}
            className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full flex items-center gap-2"
          >
            Division: {getLabelById(id, zones, "name")}
            <XCircle
              className="w-4 h-4 cursor-pointer"
              onClick={() => removeFilter("zoneIds", id)}
            />
          </div>
        ))}

        {Array.isArray(filters?.typeOfPersonIds) && filters?.typeOfPersonIds.map((id) => (
          <div
            key={id}
            className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full flex items-center gap-2"
          >
            Type: {getLabelById(id, typeOfPersons)}
            <XCircle
              className="w-4 h-4 cursor-pointer"
              onClick={() => removeFilter("typeOfPersonIds", id)}
            />
          </div>
        ))}

        {Array.isArray(filters?.statusIds) && filters?.statusIds.map((id) => (
          <div
            key={id}
            className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full flex items-center gap-2"
          >
            Status:{" "}
            {getLabelById(
              id,
              statuses,
              hasPermission(PermissionKeys.can_view_admin_label)
                ? "adminLabel"
                : "userLabel"
            )}
            <XCircle
              className="w-4 h-4 cursor-pointer"
              onClick={() => removeFilter("statusIds", id)}
            />
          </div>
        ))}

        {Array.isArray(filters?.departmentIds) && filters?.departmentIds.map((id) => (
          <div
            key={id}
            className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full flex items-center gap-2"
          >
            Department:{" "}
            {getLabelById(
              id,
              departments)}
            <XCircle
              className="w-4 h-4 cursor-pointer"
              onClick={() => removeFilter("departmentIds", id)}
            />
          </div>
        ))}

      </div>

      {/* Actions */}
      <div className="flex justify-end sm:flex-row flex-col flex-wrap gap-3">
        <Button variant="outline" onClick={handleClearFilters}>
          Clear Filters
        </Button>
        <DownloadReportPdf data={filters} />
        <Button onClick={applyFilters} loading={generatingReports}>
          <PlusCircle className="mr-2 h-4 w-4" /> Generate Report
        </Button>
      </div>
    </Card>
  );
}

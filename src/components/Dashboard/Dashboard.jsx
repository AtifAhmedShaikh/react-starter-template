
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  renderBar,
  renderHorizontalBar,
  renderPie,
  renderStackedBar
} from "./ChartRenderer"

export default function DashboardCharts({ data }) {
  if (!data) return null

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 sm:gap-2">
      {/* Complaint Status Breakdown */}
      <Card className="w-full gap-0">
        <CardHeader className="pb-1 px-2 pt-2 sm:px-4 sm:pt-4">
          <CardTitle className="text-sm sm:text-base lg:text-lg">Complaints by Status</CardTitle>
        </CardHeader>
        <CardContent className="p-2 sm:p-3 pb-2 sm:px-4 sm:pb-4">
          {renderBar(data.groupedStatusStats, "count", "value", true, 20)}
        </CardContent>
      </Card>

      {/* City-wise Users */}
      <Card className="w-full">
        <CardHeader className="pb-1 px-2 pt-2 sm:px-4 sm:pt-4">
          <CardTitle className="text-sm sm:text-base lg:text-lg">Users by City</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 px-2 pb-2 sm:px-4 sm:pb-4">
          {renderHorizontalBar(data.groupedCityUsers, "count", "value")}
        </CardContent>
      </Card>

      {/* Type of Offences */}
      <Card className="w-full gap-0">
        <CardHeader className=" px-2 mb-0 sm:px-4 sm:pt-4">
          <CardTitle className="text-sm sm:text-base lg:text-lg">Offence Types</CardTitle>
        </CardHeader>
        <CardContent className="py-0 px-2 sm:px-4 sm:pb-4">
          {renderPie(data.groupedOffenceStats, "count", "value", true, 300)}
        </CardContent>
      </Card>

      {/* Type of Person */}
      <Card className="w-full gap-0">
        <CardHeader className="px-2 sm:px-4 sm:pt-4">
          <CardTitle className="text-sm sm:text-base lg:text-lg">Type of Person</CardTitle>
        </CardHeader>
        <CardContent className="px-2 sm:px-4 sm:pb-4">
          {renderPie(data.groupedTypeOfPersonStats, "count", "value", true, 300)}
        </CardContent>
      </Card>

      {/* Division-wise Complaints */}
      <Card className="w-full lg:col-span-2">
        <CardHeader className="pb-1 px-2 pt-2 sm:px-4 sm:pt-4">
          <CardTitle className="text-sm sm:text-base lg:text-lg">Complaints by Division</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 px-2 pb-2 sm:px-4 sm:pb-4">
          {renderStackedBar({
            data: data.groupedZoneStats,
            keys: ['total', 'opened', 'resolved'],
            nameKey: 'value',
            colors: ['oklch(51.82% 0.173 142.06)', '#D32662', '#000'],
            height: 280
          })}
        </CardContent>
      </Card>

      {/* Department-wise Complaints */}
      {/* <Card className={"col-span-2"}>
        <CardHeader><CardTitle>Complaints by Department</CardTitle></CardHeader>
        <CardContent>
          {renderBar(data.finalGroupedDepartmentStats, "count", "value")}
        </CardContent>
      </Card> */}



    </div>
  )
}


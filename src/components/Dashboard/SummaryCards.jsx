"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, FileText, Users } from "lucide-react"

const summaryConfig = [
    {
        key: "totalComplaints",
        title: "Total Complaints",
        icon: FileText,
        bgColor: "bg-slate-900",
        textColor: "text-white",
    },
    {
        key: "newComplaintsCount",
        title: "New Complaints",
        icon: FileText,
        bgColor: "bg-blue-600",
        textColor: "text-white",
    },
    {
        key: "openComplaintsCount",
        title: "Open Complaints",
        icon: Clock,
        bgColor: "bg-yellow-500",
        textColor: "text-white",
    },
    {
        key: "handledComplaintsCount",
        title: "Handled Complaints",
        icon: CheckCircle,
        bgColor: "bg-green-600",
        textColor: "text-white",
    },
    {
        key: "totalUsers",
        title: "Registered Users",
        icon: Users,
        bgColor: "bg-green-700",
        textColor: "text-white",
    },
    {
        key: "totalAdmins",
        title: "Registered Officers ",
        icon: Users,
        bgColor: "bg-green-800",
        textColor: "text-white",
    },
]

export default function SummaryCards({ data }) {
    if (!data) return null

    return (
        <div className="grid gap-2 sm:gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-6">
            {summaryConfig.map(({ key, title, icon, bgColor, textColor }) => {
                const Icon = icon
                return (<Card key={key} className={`${bgColor} ${textColor} border-0 p-3 sm:p-4`}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 p-2 sm:p-3">
                        <CardTitle className="text-xs sm:text-sm font-medium leading-tight">{title}</CardTitle>
                        <Icon className="h-3 w-3 sm:h-4 sm:w-4 opacity-75 flex-shrink-0" />
                    </CardHeader>
                    <CardContent className="px-2 sm:px-3 pb-2 sm:pb-3">
                        <div className="text-base sm:text-lg lg:text-xl font-bold">{data[key] ?? 0}</div>
                    </CardContent>
                </Card>
                )
            })}
        </div>
    )
}

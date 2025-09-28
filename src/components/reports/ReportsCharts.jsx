import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    ResponsiveContainer
} from "recharts";

const COLORS = [
    "#4f46e5", "#22c55e", "#f97316", "#ef4444",
    "#14b8a6", "#facc15", "#a855f7", "#3b82f6"
];

function renderPie(data, dataKey, nameKey) {
    let updatedData = [];

    if (Array.isArray(data)) {
        // Normalize "Other"/"Others" into "Others"
        const normalized = data.map((item) => {
            const label = String(item[nameKey] || "").trim().toLowerCase();
            if (label === "other" || label === "others") {
                return { ...item, [nameKey]: "Others" };
            }
            return item;
        });

        // Sort by count
        const sorted = [...normalized].sort((a, b) => b?.[dataKey] - a?.[dataKey]);

        // Top 4 items
        const top4 = sorted.slice(0, 4);
        const rest = sorted.slice(4);

        if (rest.length > 0) {
            const othersTotal = rest.reduce((sum, item) => sum + (item[dataKey] || 0), 0);
            const othersLabel = `Others +${rest.length}`;

            // Check if "Others" already exists in top4
            const existingOthersIndex = top4.findIndex(
                (item) => String(item[nameKey]).toLowerCase() === "others"
            );

            if (existingOthersIndex >= 0) {
                // Merge counts and rename with total categories merged
                top4[existingOthersIndex][dataKey] += othersTotal;
                top4[existingOthersIndex][nameKey] = `${othersLabel}`;
            } else {
                // Add new "Others" entry
                top4.push({
                    [nameKey]: othersLabel,
                    [dataKey]: othersTotal,
                });
            }
        }

        // Always ensure "Others" is at the end
        const others = top4.filter((item) =>
            String(item[nameKey]).toLowerCase().startsWith("others")
        );
        const notOthers = top4.filter(
            (item) => !String(item[nameKey]).toLowerCase().startsWith("others")
        );

        updatedData = [...notOthers, ...others];
    }

    return (
        <ResponsiveContainer width="100%" height={400}>
            <PieChart>
                <Pie
                    data={updatedData}
                    dataKey={dataKey}
                    nameKey={nameKey}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                >
                    {updatedData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend className="mt-6" />
            </PieChart>
        </ResponsiveContainer>
    );
}




function renderBar(data, dataKey, nameKey) {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
                <XAxis dataKey={nameKey} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey={dataKey} fill="#14b8a6" />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default function ReportsCharts({ counts }) {
    if (!counts) return null;

    return (
        <div className="!grid !grid-cols-1 md:!grid-cols-2 gap-6">
            <Card className={"max-md:!col-span-2"}>
                <CardHeader>
                    <CardTitle>Complaints by Status</CardTitle>
                </CardHeader>
                <CardContent>
                    {renderPie(counts.byStatus, "count", "status")}
                </CardContent>
            </Card>

            <Card className={"max-md:!col-span-2"}>
                <CardHeader>
                    <CardTitle>Complaints by Type of Person</CardTitle>
                </CardHeader>
                <CardContent>
                    {renderPie(counts.byTypeOfPerson, "count", "typeOfPerson")}
                </CardContent>
            </Card>
            <Card className={"max-md:!col-span-2"}>
                <CardHeader>
                    <CardTitle>Complaints by Departments</CardTitle>
                </CardHeader>
                <CardContent>
                    {renderPie(counts.byDepartment, "count", "department")}
                </CardContent>
            </Card>

            <Card className={"max-md:!col-span-2"}>
                <CardHeader>
                    <CardTitle>Complaints by Offence</CardTitle>
                </CardHeader>
                <CardContent>
                    {renderPie(counts.byOffence, "count", "offence")}
                </CardContent>
            </Card>



            <Card className={"col-span-2"}>
                <CardHeader>
                    <CardTitle>Complaints by Division</CardTitle>
                </CardHeader>
                <CardContent>
                    {renderBar(counts.byZone, "count", "division")}
                </CardContent>
            </Card>
        </div>
    );
}

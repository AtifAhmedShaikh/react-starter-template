import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function StatsCards({ counts }) {
  const sections = [
    { title: "By Status", data: counts.byStatus },
    { title: "By Offence", data: counts.byOffence },
    { title: "By Type of Person", data: counts.byTypeOfPerson },
    { title: "By Division", data: counts.byZone },
    { title: "By Department", data: counts.byDepartment },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {sections.map((section, idx) => (
        <motion.div
          key={idx}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <Card className="shadow-lg">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">{section.title}</h3>
              <ul className="space-y-1 text-sm">
                {section.data.map((item, i) => (
                  <li
                    key={i}
                    className="flex justify-between border-b pb-1 text-gray-700"
                  >
                    <span>{Object.values(item)[0]}</span>
                    <span className="font-bold">{item.count}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

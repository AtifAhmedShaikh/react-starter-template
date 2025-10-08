import ComplaintsTableForReports from "@/components/reports/ComplaintsTable";
import Filters from "@/components/reports/Filters";
import ReportsCharts from "@/components/reports/ReportsCharts";
import StatsCards from "@/components/reports/StatsCards";
import { LoadingScreen } from "@/components/reuseable/Loading";
import { selectReports } from "@/stores/slices/reportsSlice";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

export default function ReportsPage() {

  const { data, loading } = useSelector(selectReports);

  return (
    <motion.div className="sm:p-6 p-2 space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 className="sm:text-2xl text-xl font-bold">Complaint Reports</h1>
      <Filters />
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          {data?.counts && <ReportsCharts counts={data?.counts} />}
          {data?.counts && <StatsCards counts={data?.counts} />}
          {data && <ComplaintsTableForReports data={data?.complaints} meta={data?.pagination} />}
        </>
      )}
    </motion.div>
  );
}

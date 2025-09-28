"use client"
import { useNavigate } from 'react-router-dom'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import { apiHandler } from "@/lib/apiWrapper"
import { COMPLAINT_APIS } from "@/constants/APIs"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import StatusBadge from '../reuseable/StatusBadge'

export default function SimilarComplaintsDialog({ complaintId }) {
  const [loading, setLoading] = useState(false)
  const [complaints, setComplaints] = useState([])
  const navigate = useNavigate()

  const fetchSimilar = async () => {
    setLoading(true)
    const res = await apiHandler(
      `${COMPLAINT_APIS.GET_SIMILAR_COMPLAINTS}/${complaintId}`
    )
    if (res.success) setComplaints(res.data.similarComplaints || [])
    setLoading(false)
  }

  return (
    <Dialog className={"max-w-5xl !w-full "}>
      {/* Trigger button */}
      <DialogTrigger asChild>
        <Button
          onClick={fetchSimilar}
          disabled={loading}
          className="flex items-center max-w-min gap-2"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          Show Similar Complaints
        </Button>
      </DialogTrigger>

      {/* Dialog Content */}
      <DialogContent className="!max-w-5xl !w-full !max-h-[calc(100vh-40px)]  overflow-auto">
        <DialogHeader>
          <DialogTitle>Similar Complaints</DialogTitle>
          <DialogDescription>
            These complaints have similar details.
          </DialogDescription>
        </DialogHeader>

        {loading && (
          <div className="flex justify-center items-center py-6">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        )}

        {!loading && complaints.length === 0 && (
          <p className="text-center text-gray-500 py-6">
            No similar complaints found.
          </p>
        )}

        {!loading && complaints.length > 0 && (
          <div className="rounded-md border max-w-full overflow-x-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow className="!bg-primary [&_th]:!text-white">
                  <TableHead>Ref No</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Submission Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {complaints.map((c) => (
                  <TableRow key={c.id} onClick={() => {
                    navigate(`/complaint-details/${c.id}`)
                  }} className={"cursor-pointer"}>
                    <TableCell>{c.refNo}</TableCell>
                    <TableCell>
                      {c.subject.length > 50
                        ? c.subject.slice(0, 50) + "..."
                        : c.subject}
                    </TableCell>
                    <TableCell>
                      {new Date(c.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell><StatusBadge status={c?.status} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { PermissionKeys } from "@/constants/permissions"
import { usePermissions } from "@/hooks/usePermissions"
import { formatRelativeTime } from "@/utils/formatters"
import { motion } from "framer-motion"
import {
  ArrowRight,
  ArrowRightLeft,
  Clock,
  FileText,
  MessageSquareQuote,
  Send,
  Sparkle,
  User
} from "lucide-react"
import { useState } from "react"
import GlobalFileViewer from "../reuseable/GlobalFileViewer"
import StatusBadge from "../reuseable/StatusBadge"


// Get initials from name
const getInitials = (name) => {
  if (!name) return "A"
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
}


const FilePreview = ({ files, setSelectedFile }) => {
  if (!files || files.length === 0) return null

  return (
    <div className="mt-3">
      <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
        <FileText className="h-4 w-4" />
        Attachments ({files.length})
      </h4>
      <div className="flex flex-wrap gap-2 max-w-full">
        {files.map((file, index) => (
          <Badge
            key={index}
            variant="outline"
            onClick={() => setSelectedFile(file)}
            className="cursor-pointer bg-blue-50  text-blue-700 border-blue-200 hover:bg-blue-200 transition-all overflow-hidden text-ellipsis whitespace-normal line-clamp-1"
          >
            {file?.key?.split("/")?.pop() || ""}
          </Badge>
        ))}
      </div>
    </div>
  )
}

export default function ComplaintHistoryUI({ history=null }) {
  const [selectedFile, setSelectedFile] = useState(null)
  const { hasPermission } = usePermissions()
  const canViewBehind = hasPermission(PermissionKeys.can_view_behind_person)
  const { complaintHistories: complaintHistory, complaintResponsibles } = history

  const renderUserAvatar = (user) => {
    return canViewBehind ? (
      <Avatar className="h-8 w-8 border border-gray-200">
        <AvatarImage src={user?.profileImage} alt="@shadcn" />
        <AvatarFallback className="bg-gray-100 text-gray-800 text-xs">
          {getInitials(user?.fullName)}
        </AvatarFallback>
      </Avatar>
    ) : (
      <div className="h-8 w-8 rounded-full border border-gray-200 bg-gray-100 flex items-center justify-center">
        <User className="h-4 w-4 text-gray-500" />
      </div>
    )
  }

  const renderForwardedBySection = (user, charge, isResponsible = false) => {
    return (
      <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200 p-2 rounded-md">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex-shrink-0">
              {renderUserAvatar(user)}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {canViewBehind
                ? `Forwarded by: ${user?.fullName || ''}`
                : `Forwarded by: ${charge?.chargeName || ''}`}
            </p>
          </TooltipContent>
        </Tooltip>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate flex items-center gap-1">
            <User className="h-3 w-3 text-gray-500" />
            {canViewBehind ? (
              <>
                {user?.fullName || 'Unknown'}
                {user?.isTransferred && <Badge variant="outline">Transferred</Badge>}
              </>
            ) : (
              charge?.chargeName || 'Authorized Personnel'
            )}
            {isResponsible ? <Sparkle className="h-4 w-4 text-destructive" />
              : null}
          </p>
          <p className="text-xs text-gray-500">
            {canViewBehind
              ? `From: ${charge?.chargeName} - ${user?.role?.value || 'No Designation'}`
              : `Designation: ${user?.role?.value || 'Authorized'}`}
          </p>
        </div>
      </div>
    )
  }

  const renderForwardedToUser = (recipient, index) => {
    return (
      <div key={index} className="flex items-center gap-2 bg-blue-50 p-2 rounded-md border border-blue-200">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex-shrink-0">
              {renderUserAvatar(recipient)}
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {canViewBehind
                ? `Recipient ${index + 1}: ${recipient?.fullName || 'Unassigned'}`
                : `Recipient ${index + 1}: ${recipient?.role?.value || 'Authorized'}`}
            </p>
          </TooltipContent>
        </Tooltip>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate flex items-center gap-1">
            <Badge variant="outline" className="bg-blue-100 text-blue-700 text-xs mr-1">
              {index + 1}
            </Badge>
            {canViewBehind ? (
              <>
                {recipient?.fullName || 'Unassigned'}
                {recipient?.isTransferred && <Badge variant="outline">Transferred</Badge>}
              </>
            ) : (
              recipient?.role?.value || 'Authorized Personnel'
            )}
          </p>
          <p className="text-xs text-gray-500">
            {canViewBehind
              ? recipient?.role?.value || ''
              : recipient?.charge?.chargeName || ''}
          </p>
        </div>
      </div>
    )
  }


  return (
    <TooltipProvider>
      <div className="mt-5 mx-auto p-6  border-2 border-primary/20  rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          <ArrowRightLeft className="h-6 w-6 text-emerald-600" />
          Complaint History
        </h2>
        <div className="space-y-6 relative">
          <div className="absolute left-[27px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 to-emerald-100 z-0"></div>
          {complaintHistory && complaintHistory.length > 0 ? (
            <>
              {complaintHistory.map((entry, index) => {
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card
                      className={`relative overflow-hidden transition-all duration-300 ${"ring-2 ring-offset-0 border-none ring-emerald-500 shadow-lg"
                        }`}
                    >
                      {<div className="absolute top-0 -left-2 w-3 h-full bg-emerald-500"></div>}

                      <CardContent className="p-0">
                        <div className="flex gap-4 p-4">
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-semibold text-gray-900 text-lg">Timeline Record</h3>
                                <p className="text-sm text-gray-500">{formatRelativeTime(entry.createdAt)}</p>
                              </div>
                            </div>
                            <div className="space-y-3 mt-3">
                              {entry.forwardByUser && renderForwardedBySection(entry.forwardByUser, entry.forwardedBy)}

                              <div>
                                <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                                  <Send className="h-4 w-4 text-gray-500" />
                                  Forwarded To:
                                </h4>
                                {entry.forwardToUsers ? (
                                  <div className="grid grid-cols-1 gap-2">
                                    {entry.forwardToUsers.map((recipient, index) =>
                                      renderForwardedToUser(recipient, index)
                                    )}
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-md border border-gray-200">
                                    <Clock className="h-5 w-5 text-gray-400" />
                                    <p className="text-sm text-gray-500 italic">Not forwarded yet</p>
                                  </div>
                                )}
                              </div>

                              <div className="mt-3 flex items-center gap-2">
                                {entry?.previousStatus?.id === entry?.currentStatus?.id ? (
                                  <StatusBadge status={entry?.currentStatus} />
                                ) : (
                                  <>
                                    {entry?.previousStatus && <StatusBadge status={entry?.previousStatus} />}
                                    {entry?.currentStatus && (
                                      <>
                                        <ArrowRight />
                                        <StatusBadge status={entry?.currentStatus} />
                                      </>
                                    )}
                                  </>
                                )}
                              </div>

                              {entry.remarks ? (
                                <div className="mt-3 bg-gray-50 p-3 rounded-md border-l-2 border-gray-300">
                                  <div className="flex items-start gap-2">
                                    <MessageSquareQuote className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                                    <p className="text-sm text-gray-700 break-words">{entry.remarks?.content}</p>
                                  </div>
                                  <FilePreview files={entry?.remarks?.attachments} setSelectedFile={setSelectedFile} />
                                </div>
                              ) : (
                                <div className="mt-3 bg-gray-50 p-3 rounded-md border-l-2 border-gray-300">
                                  <div className="flex items-start gap-2">
                                    <MessageSquareQuote className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                                    <p className="text-sm text-gray-700 break-words">No remarks</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}

              {Array.isArray(complaintResponsibles) &&  complaintResponsibles?.map((responsible, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-md">
                    <div className="absolute top-0 -left-2 w-3 h-full bg-emerald-500"></div>
                    <CardContent className="p-0">
                      <div className="flex gap-4 p-4">
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="font-semibold flex items-center gap-5 text-gray-900 text-lg">
                                Timeline Record
                              </h3>
                              <p className="text-sm text-gray-500">{formatRelativeTime(responsible.createdAt)}</p>
                            </div>
                          </div>
                          <div className="space-y-3 mt-3">
                            {responsible?.charge?.assignedPerson &&
                              renderForwardedBySection(
                                responsible?.charge?.assignedPerson,
                                responsible?.charge,
                                true
                              )}

                            <div>
                              <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                                <Send className="h-4 w-4 text-gray-500" />
                                Forwarded To:
                              </h4>
                              <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-md border border-gray-200">
                                <Clock className="h-5 w-5 text-gray-400" />
                                <p className="text-sm text-gray-500 italic">Not forwarded yet</p>
                              </div>
                            </div>

                            <div className="mt-3 bg-gray-50 p-3 rounded-md border-l-2 border-gray-300">
                              <div className="flex items-start gap-2">
                                <MessageSquareQuote className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
                                <p className="text-sm text-gray-700 break-words">No remarks</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No history available for this complaint yet.</p>
            </div>
          )}
        </div>
      </div>

      <GlobalFileViewer file={selectedFile} onClose={() => setSelectedFile(null)} />
    </TooltipProvider>
  )
}
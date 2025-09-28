import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { ArrowLeftRight, Check, FileText, ImageIcon } from "lucide-react"

export const ForwardBackReviewStep = ({ form, lastHistory, user }) => {
  const attachments = form.watch("attachment") || []

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Check className="w-5 h-5 text-primary" />
            Review Before Sending Back
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">

          {/* Direction: From current user -> Sender */}
          <div className="flex items-center justify-between bg-muted/30 p-4 rounded-lg border text-sm">
            {/* Current User */}
            <div className="flex items-center gap-2">
              <img
                src={user?.profileImage || "/placeholder.png"}
                alt="Current User"
                className="rounded-full object-cover w-20 h-20 border"
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = "/profile.jpg";
                }}
              />
              <div>
                <p className="font-medium">{user?.fullName}</p>
                <p className="text-muted-foreground">{user?.role}</p>
              </div>
            </div>

            {/* Arrow */}
            <ArrowLeftRight className="w-6 h-6 text-muted-foreground" />

            {/* Sender */}
            <div className="flex items-center gap-2">
              <img
                src={lastHistory?.forwardedBy?.assignedPerson?.profileImage || "/placeholder.png"}
                alt="Sender"
                className="rounded-full object-cover w-20 h-20 border"
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = "/profile.jpg";
                }}
              />
              <div>
                <p className="font-medium">{lastHistory?.forwardedBy?.assignedPerson?.fullName}</p>
                <p className="text-muted-foreground">{lastHistory?.forwardedBy?.assignedPerson?.role?.value}</p>
              </div>
            </div>
          </div>

          {/* Remarks */}
          <div className="space-y-2">
            <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Remarks</h4>
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm leading-relaxed">{form.watch("remarks")}</p>
            </div>
          </div>

          <Separator />

          {/* Attachments */}
          <div className="space-y-2">
            <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
              Attachments ({attachments.length})
            </h4>
            {attachments.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {attachments.map((file, index) => (
                  <div
                    key={index}
                    className="bg-muted/50 rounded-lg p-4 flex items-center gap-3"
                  >
                    {file.type === "application/pdf" ? (
                      <FileText className="w-8 h-8 text-red-500" />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-blue-500" />
                    )}
                    <div>
                      <p className="font-medium text-sm">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">No attachments uploaded</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Confirmation */}
      <Card className="border-red-300 p-0 bg-red-400/20 dark:border-amber-800 dark:bg-amber-950/20">
        <CardContent className="py-4">
          <FormField
            control={form.control}
            name="confirm"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox checked={field.value || false} onCheckedChange={field.onChange} className={"border-red-400"} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm font-medium">
                    I confirm the provided information is accurate
                  </FormLabel>
                  <p className="text-xs text-muted-foreground">
                    Submitting false information may result in disciplinary action.
                  </p>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </div>
  )
}

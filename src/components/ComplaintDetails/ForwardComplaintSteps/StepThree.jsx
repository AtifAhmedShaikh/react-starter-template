import StatusBadge from "@/components/reuseable/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { getStatusById } from "@/utils/helper";
import { Check, FileText } from "lucide-react";

export const StepThree = ({ form, selectedCharges, statusArray }) => {
  const attachments = form.watch("attachment") || [];

  // Function to create object URLs for preview
  const getPreviewUrl = (file) => {
    return file instanceof File ? URL.createObjectURL(file) : file.url;
  };

  return (
    <div className="space-y-6">
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Check className="w-5 h-5 text-primary" />
            Review Your Submission
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 sm:px-6 px-2">
          <div className="grid gap-4">
            {/* Selected Charges */}
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                Selected officers ({selectedCharges.length})
              </h4>
              <div className="flex flex-wrap gap-2 max-w-full">
                {selectedCharges.map((charge) => (
                  <Badge key={charge.id} variant="secondary" className="text-sm max-w-full break-words whitespace-normal leading-tight py-1 px-2">
                    <span className="break-all">
                      {charge.assignedPerson?.fullName || "Unassigned"} ({charge.chargeName})
                    </span>
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            {/* Remarks */}
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Remarks</h4>
              <div className="bg-muted/50 rounded-lg p-4 sm:px-6 px-2">
                <p className="leading-relaxed sm:text-base text-xs">{form.watch("remarks")}</p>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 sm:px-6 px-2">
                <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Status</h4>
                <StatusBadge status={getStatusById(form.watch("status"), statusArray)} />
              </div>
            </div>

            <Separator />

            {/* Multiple Attachments */}
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                Attachments ({attachments.length})
              </h4>
              {attachments.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {attachments.map((file, index) => {
                    const previewUrl = getPreviewUrl(file);
                    const isImage = file.type.startsWith("image/");
                    const isPDF = file.type === "application/pdf";

                    return (
                      <div
                        key={index}
                        className="bg-muted/50 rounded-lg p-4 flex flex-col gap-3"
                      >
                        {isImage ? (
                          <div className="relative aspect-video overflow-hidden rounded-md">
                            <img
                              src={previewUrl}
                              alt={file.name}
                              className="object-cover w-full h-full"
                              onLoad={() => URL.revokeObjectURL(previewUrl)}
                            />
                          </div>
                        ) : isPDF ? (
                          <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-gray-100 flex items-center justify-center">
                            <iframe
                              src={`${previewUrl}#view=fitH`}
                              className="w-full h-full border-none"
                              title={file.name}
                            />
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            <FileText className="w-8 h-8 text-red-500" />
                            <div>
                              <p className="font-medium text-sm">{file.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                        )}
                        <div className="mt-2">
                          <p className="font-medium text-sm">{file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">No attachments uploaded</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Checkbox */}
      <Card className="border-red-500 p-0 bg-red-400/20 dark:border-amber-800 dark:bg-amber-950/20">
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
                    I confirm that all the information provided is accurate and complete
                  </FormLabel>
                  <p className="text-xs text-muted-foreground">
                    By checking this box, you acknowledge that submitting false information may result in disciplinary
                    action.
                  </p>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </div>
  );
};
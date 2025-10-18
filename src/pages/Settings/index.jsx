"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Loader2 } from "lucide-react";
import { useEffect, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { showToast } from "@/utils/toastUtils";
import { apiHandler } from "@/lib/apiWrapper";
import { Helmet } from "react-helmet";
import { useFetchQuery } from "@/hooks/useFetchQuery";
import { useFetchMutation } from "@/hooks/useFetchMutation";
import { API_METHODS } from "@/constants";
import { USER_SETTINGS_APIS } from "@/constants/APIs";

const notificationOptions = [
  { name: "sms", label: "SMS Notifications", description: "Receive important updates via text message" },
  { name: "email", label: "Email Notifications", description: "Get notifications delivered to your inbox" },
];

export default function SettingsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch user settings using useFetchQuery
  const { data: settings, loading: fetching } = useFetchQuery({
    key: "userSettings",
    apiFn: () => apiHandler(USER_SETTINGS_APIS.UPDATE_USER_SETTINGS, { method: API_METHODS.GET }),
    onError: (error) => {
      showToast.error(error || "Failed to fetch settings");
    }
  });

  const { handleSubmit, watch, setValue, reset } = useForm({
    defaultValues: {
      sms: false,
      email: false,
      whatsApp: false,
    },
  });

  useEffect(() => {
    if (settings) {
      reset({
        sms: settings.sms,
        email: settings.email,
        whatsApp: settings.whatsApp,
      });
    }
  }, [settings, reset]);

  // Save settings using useFetchMutation
  const { mutate: saveSettings, loading: saving } = useFetchMutation({
    apiFn: async (data) => await apiHandler(USER_SETTINGS_APIS.UPDATE_USER_SETTINGS, {
      method: API_METHODS.PUT,
      data,
    }),
    onSuccess: (res) => {
      if (res.success) {
        toast.success(res?.message || "Your preferences have been saved successfully");
      } else {
        toast.error(res?.message || "Failed to save settings");
      }
    },
    onError: (error) => {
      toast.error(error || "Failed to save settings");
    },
  });

  const onSubmit = useCallback((values) => {
    saveSettings(values);
  }, [saveSettings]);

  const handleDeleteAccount = useCallback(() => {
    setIsDialogOpen(false);
    toast.success("Your account deletion request has been submitted.");
  }, []);
  

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Settings - Anti-Corruption Establishment Sindh</title>
        <meta property="og:title" content="Enquiries & Anti-Corruption Establishment Sindh." />
      </Helmet>
      
      <div className="mx-auto max-w-7xl p-4">
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-foreground">
              Notification Preferences
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Manage how you receive updates and notifications
            </p>
          </CardHeader>
          
          <CardContent>
            {fetching ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="divide-y divide-gray-100">
                  {notificationOptions.map((option) => (
                    <div key={option.name} className="py-4 flex items-center justify-between">
                      <div className="space-y-1">
                        <label htmlFor={option.name} className="text-sm font-medium leading-none">
                          {option.label}
                        </label>
                        <p className="text-sm text-muted-foreground">
                          {option.description}
                        </p>
                      </div>
                      <Switch
                        id={option.name}
                        checked={watch(option.name)}
                        onCheckedChange={(checked) => setValue(option.name, checked)}
                        className="data-[state=checked]:bg-primary"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-6 border-t border-gray-100">
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        type="button"
                        className="text-destructive border-destructive hover:bg-destructive/5"
                      >
                        Delete Account
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle className="text-destructive">Delete Your Account</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <p className="text-sm text-muted-foreground">
                          This will permanently delete your account and all associated data. 
                          You won't be able to recover any information after deletion.
                        </p>
                        <p className="text-sm font-medium text-foreground">
                          Are you absolutely sure?
                        </p>
                      </div>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setIsDialogOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={handleDeleteAccount}
                          className="bg-destructive hover:bg-destructive/90"
                        >
                          Delete Account
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Button 
                    type="submit" 
                    disabled={saving}
                    className="min-w-[120px]"
                    loading={saving}
                  >
                    Save
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
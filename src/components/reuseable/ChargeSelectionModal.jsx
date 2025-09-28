import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { setSelectedCharge } from "@/stores/slices/authSlice";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ComboboxField from "./ComboboxField";
import { toast } from "sonner";
import JsCookies from "js-cookie"
import { encryptValue } from "@/lib/encryption";


const ChargeSelectionModal = ({ open, onClose, charges = [] }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const methods = useForm({ defaultValues: { chargeId: "" } });

    const handleConfirm = (data) => {
        const selectedCharge = Array.isArray(charges) && charges.find(c => String(c?.id) === String(data?.chargeId));
        if (!selectedCharge) return toast.error("Please select a charge from the list");
        dispatch(setSelectedCharge(selectedCharge));
        JsCookies.set("selectedChargeId", encryptValue(selectedCharge?.id));
        onClose();
        navigate("/edit-profile");
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className={cn("sm:max-w-lg")} showCloseButton={false} closeOnOutsideClick={false} >
                <DialogHeader>
                    <DialogTitle>Select Charge</DialogTitle>
                </DialogHeader>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(handleConfirm)} className="space-y-4 p-2">
                        <h2 className="sm:text-lg font-semibold">Select Your Active Charge</h2>

                        <ComboboxField
                            name="chargeId"
                            placeholder="Select charge..."
                            options={charges}
                            valueKey="id"
                            labelKey="chargeName"
                            required
                        />

                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                disabled={!methods.watch("chargeId")}
                                className="ml-0"
                            >
                                Confirm & Proceed
                            </Button>
                        </div>
                    </form>
                </FormProvider>
            </DialogContent>
        </Dialog>
    );
};

export default ChargeSelectionModal;

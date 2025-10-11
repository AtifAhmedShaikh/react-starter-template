import { TextField } from "@/components/reuseable/TextField";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { statusLabelSchema } from "@/schema/statusLabelSchema";
import { closeModal, selectModalData } from "@/stores/slices/modalSlice";
import { selectStatusLabelsLoading, updateStatusLabelAsync } from "@/stores/slices/statusLabelSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const EditStatusLabelModal = () => {
  const dispatch = useDispatch();
  const statusLabel = useSelector(selectModalData);
  const loading = useSelector(selectStatusLabelsLoading);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(statusLabelSchema),
  });

  useEffect(() => {
    if (statusLabel) {
      reset({
        ...statusLabel,
      });
    }
  }, [statusLabel, reset]);

  const handleUpdate = async (data) => {
    const colorStyles = `!bg-[${data.bgColor}] !text-[${data.textColor}] !border-[${data.borderColor}]`;

    const payload = {
      ...data,
      colorStyles,
    };

    // remove unnecessary fields
    delete payload.originalStatus;
    delete payload.bgColor;
    delete payload.textColor;
    delete payload.borderColor;
    delete payload.id;

    dispatch(updateStatusLabelAsync({ id: statusLabel.id, payload }))
      .unwrap()
      .then((response) => {
        toast.success(response.message || "Status label updated successfully");
        dispatch(closeModal());
      })
      .catch((error) => {
        toast.error(error || "Failed to update status label");
      });
  };

  if (!statusLabel) return null;

  return (
    <Dialog open={true} onOpenChange={() => dispatch(closeModal())}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Status Label</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4">
          <TextField
            label="User Label"
            {...register("userLabel")}
            error={errors.userLabel?.message}
            placeholder="e.g. In Progress"
          />
          <TextField
            label="Admin Label"
            {...register("adminLabel")}
            error={errors.adminLabel?.message}
            placeholder="e.g. Assigned Officer"
          />
          <TextField
            label="Original Status"
            {...register("originalStatus")}
            error={errors.originalStatus?.message}
            disabled
          />
          <TextField
            label="Description"
            {...register("description")}
            error={errors.description?.message}
            placeholder="Optional description..."
          />
          <div className="flex items-center gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Background</label>
              <input type="color" {...register("bgColor")} className="h-10 w-16 p-1 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Text</label>
              <input type="color" {...register("textColor")} className="h-10 w-16 p-1 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Border</label>
              <input type="color" {...register("borderColor")} className="h-10 w-16 p-1 border rounded" />
            </div>
          </div>
          <div className="text-center">
            <Badge
              className="rounded-full px-4 py-2 border text-sm font-medium mt-2 inline-block"
              style={{
                backgroundColor: watch("bgColor"),
                color: watch("textColor"),
                borderColor: watch("borderColor"),
                borderWidth: "2px",
              }}
            >
              {watch("adminLabel") || ""}
            </Badge>
          </div>

          <DialogFooter>
            <Button type="submit" loading={loading.update}>Update</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditStatusLabelModal;

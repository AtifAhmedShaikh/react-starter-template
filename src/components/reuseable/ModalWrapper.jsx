import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const ModalWrapper = ({ isOpen, onClose, title, children, className, titleClassName }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose} >
      <DialogContent className={cn("sm:max-w-lg transition-all duration-300 ease-in-out data-[state=open]:opacity-100 data-[state=open]:scale-100 data-[state=closed]:opacity-0 data-[state=closed]:scale-95", className)}>
        <DialogHeader>
          <DialogTitle className={cn(titleClassName)}>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default ModalWrapper;

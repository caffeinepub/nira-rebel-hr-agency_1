import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";
import type { Job } from "../backend.d";

interface DeleteJobDialogProps {
  job: Job | null;
  open: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  isLoading: boolean;
}

export default function DeleteJobDialog({
  job,
  open,
  onClose,
  onConfirm,
  isLoading,
}: DeleteJobDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={(v) => !v && onClose()}>
      <AlertDialogContent data-ocid="jobs.delete.dialog">
        <AlertDialogHeader>
          <AlertDialogTitle
            className="font-display font-bold"
            style={{ color: "oklch(0.577 0.245 27.325)" }}
          >
            Delete Job Opening
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the <strong>{job?.position}</strong>{" "}
            position at <strong>{job?.company}</strong>? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            data-ocid="jobs.delete.cancel.button"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            data-ocid="jobs.delete.confirm.button"
            onClick={async (e) => {
              e.preventDefault();
              await onConfirm();
            }}
            disabled={isLoading}
            style={{
              backgroundColor: "oklch(0.577 0.245 27.325)",
              color: "oklch(0.985 0 0)",
            }}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : null}
            {isLoading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

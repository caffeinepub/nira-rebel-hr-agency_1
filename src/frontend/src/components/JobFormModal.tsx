import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import type { Job } from "../backend.d";

const DEPARTMENTS = [
  "SBI Bank",
  "PNB Bank",
  "Hitachi Cash Management",
  "E-Commerce / Logistics",
  "Metro Department",
  "Axis Bank",
];

const LOCATIONS = [
  "Delhi",
  "Gurugram",
  "Sonipat",
  "Rewari",
  "Farrukhnagar",
  "Agra",
  "Etawah",
  "Uttar Pradesh",
  "Bihar",
  "Patna",
  "Pan India",
];

interface JobFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (job: Omit<Job, "id"> & { id?: bigint }) => Promise<void>;
  initialData?: Job | null;
  isLoading: boolean;
  mode: "add" | "edit";
}

const emptyForm = {
  position: "",
  company: "",
  department: "",
  salary: "",
  address: "",
  location: "",
  description: "",
};

export default function JobFormModal({
  open,
  onClose,
  onSubmit,
  initialData,
  isLoading,
  mode,
}: JobFormModalProps) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (initialData) {
      setForm({
        position: initialData.position,
        company: initialData.company,
        department: initialData.department,
        salary: initialData.salary.toString(),
        address: initialData.address,
        location: initialData.location,
        description: initialData.description,
      });
    } else {
      setForm(emptyForm);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const jobData: Omit<Job, "id"> & { id?: bigint } = {
      position: form.position.trim(),
      company: form.company.trim(),
      department: form.department.trim(),
      salary: BigInt(Number.parseInt(form.salary) || 0),
      address: form.address.trim(),
      location: form.location.trim(),
      description: form.description.trim(),
      isActive: true,
    };
    if (initialData) {
      jobData.id = initialData.id;
    }
    await onSubmit(jobData);
  };

  const set =
    (field: keyof typeof emptyForm) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        data-ocid={mode === "add" ? "jobs.add.dialog" : "jobs.edit.dialog"}
        className="max-w-lg max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle
            className="font-display font-bold text-xl"
            style={{ color: "oklch(0.18 0.06 255)" }}
          >
            {mode === "add" ? "Add New Job Opening" : "Edit Job Opening"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="position" className="text-sm font-medium">
                Position *
              </Label>
              <Input
                data-ocid={`${mode === "add" ? "add" : "edit"}.position.input`}
                id="position"
                value={form.position}
                onChange={set("position")}
                placeholder="e.g., Floor Coordinator"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="company" className="text-sm font-medium">
                Company *
              </Label>
              <Input
                data-ocid={`${mode === "add" ? "add" : "edit"}.company.input`}
                id="company"
                value={form.company}
                onChange={set("company")}
                placeholder="e.g., SBI Bank"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">Department *</Label>
              <Select
                value={form.department}
                onValueChange={(v) =>
                  setForm((prev) => ({ ...prev, department: v }))
                }
                required
              >
                <SelectTrigger
                  data-ocid={`${mode === "add" ? "add" : "edit"}.department.select`}
                >
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {DEPARTMENTS.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">Location</Label>
              <Select
                value={form.location}
                onValueChange={(v) =>
                  setForm((prev) => ({ ...prev, location: v }))
                }
              >
                <SelectTrigger
                  data-ocid={`${mode === "add" ? "add" : "edit"}.location.select`}
                >
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {LOCATIONS.map((loc) => (
                    <SelectItem key={loc} value={loc}>
                      {loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="salary" className="text-sm font-medium">
                Salary (₹/month, 0 = Negotiable)
              </Label>
              <Input
                data-ocid={`${mode === "add" ? "add" : "edit"}.salary.input`}
                id="salary"
                type="number"
                min="0"
                value={form.salary}
                onChange={set("salary")}
                placeholder="0"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="address" className="text-sm font-medium">
                Address
              </Label>
              <Input
                data-ocid={`${mode === "add" ? "add" : "edit"}.address.input`}
                id="address"
                value={form.address}
                onChange={set("address")}
                placeholder="Job address"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="description" className="text-sm font-medium">
              Description
            </Label>
            <Textarea
              data-ocid={`${mode === "add" ? "add" : "edit"}.description.textarea`}
              id="description"
              value={form.description}
              onChange={set("description")}
              placeholder="Job description, responsibilities, requirements..."
              rows={3}
            />
          </div>

          <DialogFooter className="pt-2 gap-2">
            <Button
              data-ocid={`${mode === "add" ? "add" : "edit"}.cancel.button`}
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              data-ocid={`${mode === "add" ? "add" : "edit"}.submit.button`}
              type="submit"
              disabled={isLoading}
              style={{
                backgroundColor: "oklch(0.18 0.06 255)",
                color: "oklch(0.99 0 0)",
              }}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : null}
              {isLoading
                ? "Saving..."
                : mode === "add"
                  ? "Add Job"
                  : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

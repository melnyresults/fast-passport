'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Trash2 } from 'lucide-react';
import { PIPELINE_STAGES, type Lead, type PipelineStage } from '@/lib/types/admin';

interface LeadEditDialogProps {
  lead: Lead | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (lead: Lead) => void;
  onDelete: (leadId: string) => void;
}

export function LeadEditDialog({
  lead,
  open,
  onOpenChange,
  onSave,
  onDelete,
}: LeadEditDialogProps) {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    dealValue: '',
    notes: '',
    stage: '' as PipelineStage,
  });

  useEffect(() => {
    if (lead) {
      setForm({
        fullName: lead.fullName,
        email: lead.email || '',
        phone: lead.phone,
        dealValue: lead.dealValue?.toString() || '',
        notes: lead.notes || '',
        stage: lead.stage,
      });
    }
  }, [lead]);

  if (!lead) return null;

  function handleSave() {
    if (!lead) return;
    onSave({
      ...lead,
      fullName: form.fullName,
      email: form.email || null,
      phone: form.phone,
      dealValue: form.dealValue ? Number(form.dealValue) : null,
      notes: form.notes || null,
      stage: form.stage,
      updatedAt: new Date().toISOString(),
    });
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-sans">Edit Lead</DialogTitle>
          <DialogDescription>Update lead details below.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="dealValue">Deal Value ($)</Label>
            <Input
              id="dealValue"
              type="number"
              value={form.dealValue}
              onChange={(e) => setForm({ ...form, dealValue: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="stage">Stage</Label>
            <Select
              value={form.stage}
              onValueChange={(v) => setForm({ ...form, stage: v as PipelineStage })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PIPELINE_STAGES.map((stage) => (
                  <SelectItem key={stage} value={stage}>
                    {stage}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              rows={3}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </div>
        </div>

        <DialogFooter className="flex-col gap-2 sm:flex-row">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm" className="gap-2">
                <Trash2 className="h-4 w-4" />
                Delete Lead
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this lead?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently remove {lead.fullName} from the pipeline.
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    onDelete(lead.id);
                    onOpenChange(false);
                  }}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

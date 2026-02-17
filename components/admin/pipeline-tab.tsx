'use client';

import { useState, useMemo } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  closestCorners,
  type DragStartEvent,
  type DragEndEvent,
} from '@dnd-kit/core';
import { useDroppable } from '@dnd-kit/core';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { GripVertical, Mail, Phone, DollarSign, Pencil } from 'lucide-react';
import { LeadEditDialog } from './lead-edit-dialog';
import { useUpdateLead, useDeleteLead, useMoveLeadStage } from '@/hooks/admin/use-leads';
import { PIPELINE_STAGES, type Lead, type PipelineStage } from '@/lib/types/admin';
import { cn } from '@/lib/utils';

interface PipelineTabProps {
  leads: Lead[];
}

// --- Lead Card (Draggable) ---
function LeadCard({
  lead,
  onEdit,
  overlay,
}: {
  lead: Lead;
  onEdit: (lead: Lead) => void;
  overlay?: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: lead.id, data: { lead } });

  const style = overlay
    ? undefined
    : {
        transform: CSS.Translate.toString(transform),
        opacity: isDragging ? 0.3 : 1,
      };

  return (
    <div ref={overlay ? undefined : setNodeRef} style={style}>
      <Card
        className={cn(
          'cursor-grab active:cursor-grabbing transition-shadow',
          overlay && 'shadow-lg ring-2 ring-accent/50 rotate-2'
        )}
      >
        <CardContent className="p-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-1.5 flex-1 min-w-0">
              <button
                className="touch-none shrink-0 text-muted-foreground hover:text-foreground"
                {...listeners}
                {...attributes}
              >
                <GripVertical className="h-4 w-4" />
              </button>
              <span className="font-medium text-sm truncate">
                {lead.fullName}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 shrink-0"
              onClick={() => onEdit(lead)}
            >
              <Pencil className="h-3 w-3" />
            </Button>
          </div>

          <div className="mt-2 space-y-1 text-xs text-muted-foreground pl-5">
            {lead.phone && (
              <div className="flex items-center gap-1">
                <Phone className="h-3 w-3" />
                <span className="truncate">{lead.phone}</span>
              </div>
            )}
            {lead.email && (
              <div className="flex items-center gap-1">
                <Mail className="h-3 w-3" />
                <span className="truncate">{lead.email}</span>
              </div>
            )}
            {lead.dealValue && (
              <div className="flex items-center gap-1">
                <DollarSign className="h-3 w-3" />
                <span>${lead.dealValue.toLocaleString()}</span>
              </div>
            )}
          </div>

          {lead.notes && (
            <p className="mt-2 text-xs text-muted-foreground line-clamp-2 pl-5">
              {lead.notes}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// --- Pipeline Column (Droppable) ---
function PipelineColumn({
  stage,
  leads,
  onEditLead,
}: {
  stage: PipelineStage;
  leads: Lead[];
  onEditLead: (lead: Lead) => void;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: stage });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'flex flex-col rounded-lg border bg-muted/40 p-2 min-h-[200px] transition-colors',
        isOver && 'bg-accent/10 border-accent/50'
      )}
    >
      <div className="flex items-center justify-between mb-2 px-1">
        <h3 className="font-sans text-xs font-semibold truncate">{stage}</h3>
        <Badge variant="secondary" className="text-xs shrink-0 ml-1">
          {leads.length}
        </Badge>
      </div>
      <div className="flex flex-col gap-2 flex-1">
        {leads.map((lead) => (
          <LeadCard key={lead.id} lead={lead} onEdit={onEditLead} />
        ))}
      </div>
    </div>
  );
}

// --- Mobile Stage View ---
function MobileStageView({
  stage,
  leads,
  onEditLead,
  onMoveLead,
}: {
  stage: PipelineStage;
  leads: Lead[];
  onEditLead: (lead: Lead) => void;
  onMoveLead: (leadId: string, newStage: PipelineStage) => void;
}) {
  return (
    <div className="space-y-2">
      {leads.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-8">
          No leads in this stage
        </p>
      ) : (
        leads.map((lead) => (
          <Card key={lead.id}>
            <CardContent className="p-3">
              <div className="flex items-start justify-between gap-2">
                <span className="font-medium text-sm">{lead.fullName}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 shrink-0"
                  onClick={() => onEditLead(lead)}
                >
                  <Pencil className="h-3 w-3" />
                </Button>
              </div>

              <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                {lead.phone && (
                  <div className="flex items-center gap-1">
                    <Phone className="h-3 w-3" />
                    <span>{lead.phone}</span>
                  </div>
                )}
                {lead.email && (
                  <div className="flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    <span>{lead.email}</span>
                  </div>
                )}
                {lead.dealValue && (
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    <span>${lead.dealValue.toLocaleString()}</span>
                  </div>
                )}
              </div>

              {lead.notes && (
                <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
                  {lead.notes}
                </p>
              )}

              <div className="mt-3">
                <Select
                  value={stage}
                  onValueChange={(v) =>
                    onMoveLead(lead.id, v as PipelineStage)
                  }
                >
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="Move to..." />
                  </SelectTrigger>
                  <SelectContent>
                    {PIPELINE_STAGES.map((s) => (
                      <SelectItem key={s} value={s} className="text-xs">
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}

// --- Main Pipeline Tab ---
export function PipelineTab({ leads }: PipelineTabProps) {
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [activeDragLead, setActiveDragLead] = useState<Lead | null>(null);
  const [mobileStage, setMobileStage] = useState<PipelineStage>(
    PIPELINE_STAGES[0]
  );

  const updateLeadMutation = useUpdateLead();
  const deleteLeadMutation = useDeleteLead();
  const moveLeadMutation = useMoveLeadStage();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } })
  );

  const leadsByStage = useMemo(() => {
    const map: Record<PipelineStage, Lead[]> = {} as Record<PipelineStage, Lead[]>;
    PIPELINE_STAGES.forEach((stage) => {
      map[stage] = leads.filter((l) => l.stage === stage);
    });
    return map;
  }, [leads]);

  function handleDragStart(event: DragStartEvent) {
    const lead = event.active.data.current?.lead as Lead | undefined;
    setActiveDragLead(lead || null);
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveDragLead(null);
    const { active, over } = event;
    if (!over) return;

    const leadId = active.id as string;
    const newStage = over.id as string;

    moveLeadMutation.mutate({ id: leadId, stage: newStage });
  }

  function moveLead(leadId: string, newStage: PipelineStage) {
    moveLeadMutation.mutate({ id: leadId, stage: newStage });
  }

  function handleSaveLead(updated: Lead) {
    updateLeadMutation.mutate(updated);
  }

  function handleDeleteLead(leadId: string) {
    deleteLeadMutation.mutate(leadId);
  }

  function openEditDialog(lead: Lead) {
    setEditingLead(lead);
    setEditDialogOpen(true);
  }

  return (
    <>
      {/* Desktop: Horizontal scrollable kanban */}
      <div className="hidden md:block">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-3 overflow-x-auto pb-4">
            {PIPELINE_STAGES.map((stage) => (
              <div key={stage} className="w-[260px] shrink-0">
                <PipelineColumn
                  stage={stage}
                  leads={leadsByStage[stage]}
                  onEditLead={openEditDialog}
                />
              </div>
            ))}
          </div>

          <DragOverlay>
            {activeDragLead && (
              <div className="w-[240px]">
                <LeadCard
                  lead={activeDragLead}
                  onEdit={() => {}}
                  overlay
                />
              </div>
            )}
          </DragOverlay>
        </DndContext>
      </div>

      {/* Mobile: Single column with stage selector */}
      <div className="md:hidden space-y-4">
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="font-sans text-sm font-semibold">
              Pipeline Stage
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <Select
              value={mobileStage}
              onValueChange={(v) => setMobileStage(v as PipelineStage)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PIPELINE_STAGES.map((stage) => (
                  <SelectItem key={stage} value={stage}>
                    {stage} ({leadsByStage[stage].length})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <MobileStageView
          stage={mobileStage}
          leads={leadsByStage[mobileStage]}
          onEditLead={openEditDialog}
          onMoveLead={moveLead}
        />
      </div>

      <LeadEditDialog
        lead={editingLead}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSave={handleSaveLead}
        onDelete={handleDeleteLead}
      />
    </>
  );
}

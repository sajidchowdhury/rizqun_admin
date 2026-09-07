import { useState } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import { ServiceFormDialog } from '@/components/landing-content/service-form-dialog';
import {
  useCreateService,
  useDeleteService,
  useUpdateService,
} from '@/hooks/use-landing-content';
import type { CreateServiceForm } from '@/schemas/landing-content';
import type { LandingService } from '@/types/landing-content';

interface ServicesTabProps {
  services: LandingService[];
}

export function ServicesTab({ services }: ServicesTabProps) {
  const createService = useCreateService();
  const updateService = useUpdateService();
  const deleteService = useDeleteService();

  const [createOpen, setCreateOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<LandingService | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<LandingService | null>(null);

  function handleCreate(values: CreateServiceForm) {
    createService.mutate(values, {
      onSuccess: () => setCreateOpen(false),
    });
  }

  function handleUpdate(values: CreateServiceForm) {
    if (!editTarget) return;
    updateService.mutate(
      { id: editTarget.id, ...values },
      { onSuccess: () => setEditTarget(null) },
    );
  }

  function handleDelete() {
    if (!deleteTarget) return;
    deleteService.mutate(deleteTarget.id, {
      onSuccess: () => setDeleteTarget(null),
    });
  }

  function handleToggleActive(svc: LandingService, next: boolean) {
    // Don't send the whole form — only the isActive flag, so the row
    // stays responsive even if other fields are mid-edit in the dialog.
    updateService.mutate({ id: svc.id, isActive: next });
  }

  // Show inactive services last so the active ones are at the top.
  const ordered = [...services].sort((a, b) => {
    if (a.isActive !== b.isActive) return a.isActive ? -1 : 1;
    return a.order - b.order;
  });

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Services ({services.length})</CardTitle>
        <Button onClick={() => setCreateOpen(true)} size="sm">
          <Plus className="size-4" />
          Add service
        </Button>
      </CardHeader>
      <CardContent>
        <div className="max-h-[28rem] overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">Emoji</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="hidden md:table-cell">Description</TableHead>
                <TableHead className="hidden lg:table-cell">Image</TableHead>
                <TableHead>WA key</TableHead>
                <TableHead className="text-center">Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ordered.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No services yet. Click “Add service” to create one.
                  </TableCell>
                </TableRow>
              ) : (
                ordered.map((svc) => (
                  <TableRow key={svc.id}>
                    <TableCell className="text-xl">{svc.emoji || '—'}</TableCell>
                    <TableCell className="font-medium">
                      <div className="flex flex-col">
                        <span>{svc.title}</span>
                        <span className="text-xs text-muted-foreground md:hidden">
                          {svc.description || 'No description'}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden max-w-xs align-middle text-muted-foreground md:table-cell">
                      <span className="line-clamp-2">{svc.description || '—'}</span>
                    </TableCell>
                    <TableCell className="hidden align-middle lg:table-cell">
                      {svc.imageUrl ? (
                        <a
                          href={svc.imageUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-block overflow-hidden rounded-md border bg-muted"
                        >
                          <img
                            src={svc.imageUrl}
                            alt={svc.title}
                            className="size-10 object-cover"
                            loading="lazy"
                          />
                        </a>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-mono">
                        {svc.whatsappKey}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Switch
                        checked={svc.isActive}
                        onCheckedChange={(next) => handleToggleActive(svc, next)}
                        disabled={updateService.isPending}
                        aria-label={`Toggle active for ${svc.title}`}
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setEditTarget(svc)}
                          aria-label={`Edit ${svc.title}`}
                        >
                          <Pencil className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteTarget(svc)}
                          aria-label={`Delete ${svc.title}`}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {/* Create dialog */}
      <ServiceFormDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onSubmit={handleCreate}
        submitting={createService.isPending}
      />

      {/* Edit dialog */}
      <ServiceFormDialog
        open={!!editTarget}
        onOpenChange={(open) => !open && setEditTarget(null)}
        service={editTarget}
        onSubmit={handleUpdate}
        submitting={updateService.isPending}
      />

      {/* Delete confirmation */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete service “{deleteTarget?.title}”?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove the service card from the landing page.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteService.isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleteService.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteService.isPending ? 'Deleting…' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}

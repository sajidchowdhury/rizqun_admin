import { useState } from 'react';
import { Pencil, Plus, Star, Trash2 } from 'lucide-react';

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

import { TestimonialFormDialog } from '@/components/landing-content/testimonial-form-dialog';
import {
  useCreateTestimonial,
  useDeleteTestimonial,
  useUpdateTestimonial,
} from '@/hooks/use-landing-content';
import type { CreateTestimonialForm } from '@/schemas/landing-content';
import type { LandingTestimonial } from '@/types/landing-content';

interface TestimonialsTabProps {
  testimonials: LandingTestimonial[];
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={
            i < rating
              ? 'size-3.5 fill-amber-500 text-amber-500'
              : 'size-3.5 text-muted-foreground/40'
          }
        />
      ))}
    </span>
  );
}

export function TestimonialsTab({ testimonials }: TestimonialsTabProps) {
  const createTestimonial = useCreateTestimonial();
  const updateTestimonial = useUpdateTestimonial();
  const deleteTestimonial = useDeleteTestimonial();

  const [createOpen, setCreateOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<LandingTestimonial | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<LandingTestimonial | null>(null);

  function handleCreate(values: CreateTestimonialForm) {
    createTestimonial.mutate(values, {
      onSuccess: () => setCreateOpen(false),
    });
  }

  function handleUpdate(values: CreateTestimonialForm) {
    if (!editTarget) return;
    updateTestimonial.mutate(
      { id: editTarget.id, ...values },
      { onSuccess: () => setEditTarget(null) },
    );
  }

  function handleDelete() {
    if (!deleteTarget) return;
    deleteTestimonial.mutate(deleteTarget.id, {
      onSuccess: () => setDeleteTarget(null),
    });
  }

  function handleToggleActive(t: LandingTestimonial, next: boolean) {
    updateTestimonial.mutate({ id: t.id, isActive: next });
  }

  const ordered = [...testimonials].sort((a, b) => {
    if (a.isActive !== b.isActive) return a.isActive ? -1 : 1;
    return a.order - b.order;
  });

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Testimonials ({testimonials.length})</CardTitle>
        <Button onClick={() => setCreateOpen(true)} size="sm">
          <Plus className="size-4" />
          Add testimonial
        </Button>
      </CardHeader>
      <CardContent>
        <div className="max-h-[28rem] overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">Avatar</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="hidden md:table-cell">Quote</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead className="text-center">Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ordered.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No testimonials yet. Click “Add testimonial” to create one.
                  </TableCell>
                </TableRow>
              ) : (
                ordered.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell>
                      <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        {t.initials || t.name.charAt(0)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{t.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {t.location || '—'}
                        </span>
                        <span className="mt-1 line-clamp-2 text-xs text-muted-foreground md:hidden">
                          “{t.quote}”
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden max-w-md align-middle text-muted-foreground md:table-cell">
                      <span className="line-clamp-2 italic">“{t.quote}”</span>
                    </TableCell>
                    <TableCell>
                      <Stars rating={t.rating} />
                    </TableCell>
                    <TableCell className="text-center">
                      <Switch
                        checked={t.isActive}
                        onCheckedChange={(next) => handleToggleActive(t, next)}
                        disabled={updateTestimonial.isPending}
                        aria-label={`Toggle active for ${t.name}`}
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setEditTarget(t)}
                          aria-label={`Edit ${t.name}`}
                        >
                          <Pencil className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setDeleteTarget(t)}
                          aria-label={`Delete ${t.name}`}
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

        {/* Live count summary so the operator can tell at a glance how many
            testimonials are visible on the landing vs hidden. */}
        <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
          <Badge variant="secondary">
            {testimonials.filter((t) => t.isActive).length} active
          </Badge>
          <Badge variant="outline">
            {testimonials.filter((t) => !t.isActive).length} inactive
          </Badge>
        </div>
      </CardContent>

      {/* Create dialog */}
      <TestimonialFormDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onSubmit={handleCreate}
        submitting={createTestimonial.isPending}
      />

      {/* Edit dialog */}
      <TestimonialFormDialog
        open={!!editTarget}
        onOpenChange={(open) => !open && setEditTarget(null)}
        testimonial={editTarget}
        onSubmit={handleUpdate}
        submitting={updateTestimonial.isPending}
      />

      {/* Delete confirmation */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete testimonial from “{deleteTarget?.name}”?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove the testimonial from the landing page.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteTestimonial.isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleteTestimonial.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleteTestimonial.isPending ? 'Deleting…' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}

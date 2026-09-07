import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import {
  SERVICE_WHATSAPP_KEYS,
  createServiceSchema,
  type CreateServiceForm,
} from '@/schemas/landing-content';
import type { LandingService } from '@/types/landing-content';

interface ServiceFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: CreateServiceForm) => void;
  /** When provided, edit mode. When null/undefined, create mode. */
  service?: LandingService | null;
  submitting?: boolean;
}

export function ServiceFormDialog({
  open,
  onOpenChange,
  onSubmit,
  service,
  submitting = false,
}: ServiceFormDialogProps) {
  const isEdit = !!service;

  const form = useForm<CreateServiceForm>({
    resolver: zodResolver(createServiceSchema),
    defaultValues: {
      emoji: '',
      title: '',
      description: '',
      imageUrl: '',
      whatsappKey: 'grocery',
      order: 0,
      isActive: true,
    },
  });

  // Reset form values whenever the dialog opens or the service changes.
  useEffect(() => {
    if (!open) return;
    form.reset({
      emoji: service?.emoji ?? '',
      title: service?.title ?? '',
      description: service?.description ?? '',
      // Backend stores imageUrl as nullable string; on the form we model
      // it as an empty-string input for ergonomics and convert to null
      // on submit.
      imageUrl: service?.imageUrl ?? '',
      whatsappKey: service?.whatsappKey ?? 'grocery',
      order: service?.order ?? 0,
      isActive: service?.isActive ?? true,
    });
  }, [open, service, form]);

  function handleSubmit(values: CreateServiceForm) {
    const trimmedImage = values.imageUrl?.trim();
    const cleaned: CreateServiceForm = {
      ...values,
      description: values.description.trim(),
      // Normalize empty/whitespace → null. The create hook then converts
      // null → undefined so the backend's `imageUrl?: string` (no null)
      // accepts it; the update hook sends null as-is to clear the field.
      imageUrl: trimmedImage && trimmedImage !== '' ? trimmedImage : null,
    };
    onSubmit(cleaned);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit service' : 'New service'}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Update the service card content.'
              : 'Add a new service card to the landing page.'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4" noValidate>
            <div className="grid grid-cols-[80px_1fr] gap-4">
              <FormField
                control={form.control}
                name="emoji"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Emoji</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="🛒"
                        className="text-center text-xl"
                        autoFocus
                        disabled={submitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. গ্রোসারি"
                        disabled={submitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <textarea
                      placeholder="Short description shown under the title."
                      disabled={submitting}
                      {...field}
                      className="flex min-h-[72px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://…  (leave blank for none)"
                      disabled={submitting}
                      {...field}
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormDescription>Public URL of the service photo.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="whatsappKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>WhatsApp key</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value} disabled={submitting}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a key" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {SERVICE_WHATSAPP_KEYS.map((k) => (
                          <SelectItem key={k} value={k}>
                            {k}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Maps this card to a WhatsApp message template.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="order"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Display order</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        step={1}
                        placeholder="0"
                        disabled={submitting}
                        {...field}
                        value={field.value ?? 0}
                        onChange={(e) => field.onChange(Number(e.target.value) || 0)}
                      />
                    </FormControl>
                    <FormDescription>Lower numbers appear first.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between rounded-md border p-3">
                  <div className="space-y-0.5">
                    <FormLabel>Active</FormLabel>
                    <FormDescription>Inactive services are hidden on the landing.</FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={submitting}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {isEdit ? 'Save changes' : 'Create service'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

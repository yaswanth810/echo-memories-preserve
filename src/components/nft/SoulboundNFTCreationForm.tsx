import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { BaseNFTCreationForm, BaseNFTFormValues } from './BaseNFTCreationForm';
import { Switch } from '../ui/switch';
import { Form, FormControl, FormField, FormItem, FormLabel } from '../ui/form';

const soulboundNFTSchema = z.object({
  ...BaseNFTFormValues.shape,
  isPublic: z.boolean().default(false),
  sharedWith: z.array(z.string()).optional(),
});

type SoulboundNFTFormValues = z.infer<typeof soulboundNFTSchema>;

interface SoulboundNFTCreationFormProps {
  onSubmit: (values: SoulboundNFTFormValues) => void;
  isLoading?: boolean;
}

export function SoulboundNFTCreationForm({ onSubmit, isLoading }: SoulboundNFTCreationFormProps) {
  const form = useForm<SoulboundNFTFormValues>({
    resolver: zodResolver(soulboundNFTSchema),
    defaultValues: {
      isPublic: false,
      sharedWith: [],
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <BaseNFTCreationForm
          onSubmit={(baseValues) => {
            form.setValue('title', baseValues.title);
            form.setValue('description', baseValues.description);
            form.setValue('mediaType', baseValues.mediaType);
            form.setValue('mediaUrl', baseValues.mediaUrl);
            form.setValue('metadata', baseValues.metadata);
          }}
          isLoading={isLoading}
        />

        <FormField
          control={form.control}
          name="isPublic"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Public Visibility</FormLabel>
                <div className="text-sm text-muted-foreground">
                  Make this memory visible to everyone
                </div>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
} 
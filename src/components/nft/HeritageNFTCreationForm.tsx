import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { BaseNFTCreationForm, BaseNFTFormValues } from './BaseNFTCreationForm';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';

const heritageNFTSchema = z.object({
  ...BaseNFTFormValues.shape,
  significance: z.string().min(1, 'Cultural significance is required'),
  community: z.string().min(1, 'Community is required'),
  validationThreshold: z.number().min(1, 'Validation threshold must be at least 1'),
});

type HeritageNFTFormValues = z.infer<typeof heritageNFTSchema>;

interface HeritageNFTCreationFormProps {
  onSubmit: (values: HeritageNFTFormValues) => void;
  isLoading?: boolean;
}

export function HeritageNFTCreationForm({ onSubmit, isLoading }: HeritageNFTCreationFormProps) {
  const form = useForm<HeritageNFTFormValues>({
    resolver: zodResolver(heritageNFTSchema),
    defaultValues: {
      significance: '',
      community: '',
      validationThreshold: 5,
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
          name="significance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cultural Significance</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the cultural significance of this heritage item"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="community"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Community</FormLabel>
              <FormControl>
                <Input placeholder="Enter the community this heritage belongs to" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="validationThreshold"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Validation Threshold</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  placeholder="Number of validations required"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
} 
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { BaseNFTCreationForm, BaseNFTFormValues } from './BaseNFTCreationForm';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Button } from '../ui/button';
import { Plus, X } from 'lucide-react';

const proofOfGoodNFTSchema = z.object({
  ...BaseNFTFormValues.shape,
  category: z.string().min(1, 'Category is required'),
  impactDescription: z.string().min(1, 'Impact description is required'),
  evidence: z.array(z.string().url('Invalid URL')).min(1, 'At least one evidence URL is required'),
  verificationThreshold: z.number().min(1, 'Verification threshold must be at least 1'),
});

type ProofOfGoodNFTFormValues = z.infer<typeof proofOfGoodNFTSchema>;

interface ProofOfGoodNFTCreationFormProps {
  onSubmit: (values: ProofOfGoodNFTFormValues) => void;
  isLoading?: boolean;
}

export function ProofOfGoodNFTCreationForm({ onSubmit, isLoading }: ProofOfGoodNFTCreationFormProps) {
  const form = useForm<ProofOfGoodNFTFormValues>({
    resolver: zodResolver(proofOfGoodNFTSchema),
    defaultValues: {
      category: '',
      impactDescription: '',
      evidence: [''],
      verificationThreshold: 3,
    },
  });

  const evidenceFields = form.watch('evidence');

  const addEvidenceField = () => {
    form.setValue('evidence', [...evidenceFields, '']);
  };

  const removeEvidenceField = (index: number) => {
    form.setValue(
      'evidence',
      evidenceFields.filter((_, i) => i !== index)
    );
  };

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
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Impact Category</FormLabel>
              <FormControl>
                <Input placeholder="Enter impact category" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="impactDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Impact Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Describe the impact of your action" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <FormLabel>Evidence URLs</FormLabel>
          {evidenceFields.map((_, index) => (
            <div key={index} className="flex gap-2">
              <FormField
                control={form.control}
                name={`evidence.${index}`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input placeholder="Enter evidence URL" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => removeEvidenceField(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={addEvidenceField}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Evidence
          </Button>
        </div>

        <FormField
          control={form.control}
          name="verificationThreshold"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Verification Threshold</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  placeholder="Number of verifications required"
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
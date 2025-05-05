import React, { useState } from 'react';
import { useBlockchain } from '../../services/blockchain';
import { CreateNFTData } from '../../types/nft';
import { toast } from 'react-hot-toast';

export const ProofOfGoodNFTForm: React.FC = () => {
  const { mintProofOfGoodNFT } = useBlockchain();
  const [formData, setFormData] = useState<CreateNFTData>({
    name: '',
    description: '',
    image: '',
    metadata: '',
    type: 'proof-of-good',
    impact: '',
    verification: '',
    beneficiary: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await mintProofOfGoodNFT(formData);
      toast.success('Proof of Good NFT created successfully!');
      setFormData({
        name: '',
        description: '',
        image: '',
        metadata: '',
        type: 'proof-of-good',
        impact: '',
        verification: '',
        beneficiary: ''
      });
    } catch (error) {
      console.error('Error creating Proof of Good NFT:', error);
      toast.error('Failed to create Proof of Good NFT');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
          Image URL
        </label>
        <input
          type="url"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="impact" className="block text-sm font-medium text-gray-700">
          Impact Description
        </label>
        <textarea
          id="impact"
          name="impact"
          value={formData.impact}
          onChange={handleChange}
          required
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="verification" className="block text-sm font-medium text-gray-700">
          Verification Details
        </label>
        <textarea
          id="verification"
          name="verification"
          value={formData.verification}
          onChange={handleChange}
          required
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="beneficiary" className="block text-sm font-medium text-gray-700">
          Beneficiary
        </label>
        <input
          type="text"
          id="beneficiary"
          name="beneficiary"
          value={formData.beneficiary}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {isSubmitting ? 'Creating...' : 'Create Proof of Good NFT'}
      </button>
    </form>
  );
}; 
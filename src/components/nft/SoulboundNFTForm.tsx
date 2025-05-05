import React, { useState } from 'react';
import { useBlockchain } from '../../services/blockchain';
import { CreateNFTData } from '../../types/nft';
import { toast } from 'react-hot-toast';

export const SoulboundNFTForm: React.FC = () => {
  const { mintSoulboundNFT } = useBlockchain();
  const [formData, setFormData] = useState<CreateNFTData>({
    name: '',
    description: '',
    image: '',
    metadata: '',
    type: 'soulbound',
    soulConnection: '',
    soulPurpose: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await mintSoulboundNFT(formData);
      toast.success('Soulbound NFT created successfully!');
      setFormData({
        name: '',
        description: '',
        image: '',
        metadata: '',
        type: 'soulbound',
        soulConnection: '',
        soulPurpose: ''
      });
    } catch (error) {
      console.error('Error creating Soulbound NFT:', error);
      toast.error('Failed to create Soulbound NFT');
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
        <label htmlFor="soulConnection" className="block text-sm font-medium text-gray-700">
          Soul Connection
        </label>
        <textarea
          id="soulConnection"
          name="soulConnection"
          value={formData.soulConnection}
          onChange={handleChange}
          required
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="soulPurpose" className="block text-sm font-medium text-gray-700">
          Soul Purpose
        </label>
        <textarea
          id="soulPurpose"
          name="soulPurpose"
          value={formData.soulPurpose}
          onChange={handleChange}
          required
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {isSubmitting ? 'Creating...' : 'Create Soulbound NFT'}
      </button>
    </form>
  );
}; 
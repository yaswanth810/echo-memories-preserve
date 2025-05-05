import { create } from 'ipfs-http-client';

const ipfs = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: `Basic ${Buffer.from(
      `${process.env.INFURA_PROJECT_ID}:${process.env.INFURA_PROJECT_SECRET}`
    ).toString('base64')}`,
  },
});

export async function uploadToIPFS(file: File): Promise<string> {
  try {
    const result = await ipfs.add(file);
    return `https://ipfs.infura.io/ipfs/${result.path}`;
  } catch (error) {
    console.error('Error uploading to IPFS:', error);
    throw error;
  }
}

export async function uploadJSONToIPFS(data: any): Promise<string> {
  try {
    const result = await ipfs.add(JSON.stringify(data));
    return `https://ipfs.infura.io/ipfs/${result.path}`;
  } catch (error) {
    console.error('Error uploading JSON to IPFS:', error);
    throw error;
  }
} 
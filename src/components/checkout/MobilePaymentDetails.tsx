
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { MobilePaymentDetails } from '@/types/checkout';
import { Upload } from 'lucide-react';

interface MobilePaymentDetailsProps {
  details: MobilePaymentDetails;
  amount: number;
  onProofUpload: (file: File) => void;
}

const MobilePaymentDetails = ({ details, amount, onProofUpload }: MobilePaymentDetailsProps) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onProofUpload(file);
    }
  };

  return (
    <div className="mt-4 p-4 border border-gray-200 rounded-lg space-y-4">
      <div className="bg-blue-50 p-3 rounded-md mb-4">
        <p className="text-sm text-blue-700">
          Please transfer exactly <span className="font-bold">${amount.toFixed(2)}</span> to complete your order
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Bank</Label>
          <Input value={details.bank} readOnly className="bg-gray-50" />
        </div>
        <div>
          <Label>Account Number</Label>
          <Input value={details.accountNumber} readOnly className="bg-gray-50" />
        </div>
        <div>
          <Label>Phone</Label>
          <Input value={details.phone} readOnly className="bg-gray-50" />
        </div>
        <div>
          <Label>Reference ID</Label>
          <Input value={details.referenceId} readOnly className="bg-gray-50" />
        </div>
      </div>

      <div className="mt-4">
        <Label>Upload Payment Proof</Label>
        <div className="mt-2">
          <label className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-pharma-500 focus:outline-none">
            <span className="flex items-center space-x-2">
              <Upload className="w-6 h-6 text-gray-600" />
              <span className="font-medium text-gray-600">
                {details.proofImage ? details.proofImage.name : 'Click to upload payment proof'}
              </span>
            </span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default MobilePaymentDetails;

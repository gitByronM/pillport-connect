
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { ShippingAddress } from '@/types/checkout';

interface AddressEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAddress: ShippingAddress;
  onSave: (address: ShippingAddress) => void;
}

const AddressEditModal = ({ isOpen, onClose, currentAddress, onSave }: AddressEditModalProps) => {
  const [address, setAddress] = useState<ShippingAddress>(currentAddress);

  const handleSave = () => {
    onSave(address);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Delivery Address</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={address.name}
                onChange={(e) => setAddress({ ...address, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={address.phone}
                onChange={(e) => setAddress({ ...address, phone: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="street">Street Address</Label>
            <Input
              id="street"
              value={address.street}
              onChange={(e) => setAddress({ ...address, street: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="apt">Apt/Suite/Floor</Label>
              <Input
                id="apt"
                value={address.apt}
                onChange={(e) => setAddress({ ...address, apt: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="locationName">Location Name (Optional)</Label>
              <Input
                id="locationName"
                value={address.locationName || ''}
                onChange={(e) => setAddress({ ...address, locationName: e.target.value })}
                placeholder="e.g., Home, Office"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                value={address.city}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="municipality">Municipality</Label>
              <Input
                id="municipality"
                value={address.municipality || ''}
                onChange={(e) => setAddress({ ...address, municipality: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="instructions">Additional Instructions (Optional)</Label>
            <Textarea
              id="instructions"
              value={address.additionalInstructions || ''}
              onChange={(e) => setAddress({ ...address, additionalInstructions: e.target.value })}
              placeholder="Special instructions for delivery"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save Address</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddressEditModal;

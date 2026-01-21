export interface Parcel {
  id: string;
  name: string;
  description: string;
  quantity: number;
  weight: number;
}

export type ParcelFormData = Omit<Parcel, 'id'>;

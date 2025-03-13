export type UserType = {
  id: string;
  name: string;
  slug: string;
  slugUrl: string;
  email: string;
  location: string;
  rating: number;
  products: Array<any>;
  address: {
    fullName: string;
    phone: string;
    fullAddress: string;
    details?: string;
  } | null;
};

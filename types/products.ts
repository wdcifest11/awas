export type ProductsType = {
  title: string;
  thumbnail: string;
  slug: string;
  brand: string;
  price: number;
  description: {
    title: string;
    name: string;
    details: Array<string>;
    features: Array<string>;
  };
  category: string;
  gender: string;
  user: {
    name: string;
    slug: string;
    location: string;
    rating: number;
  };
  sellingType: Array<string>;
  condition: string;
  size: string | Array<string>;
  type: string;
  isSold: boolean;
  likes: number;
  comments: Array<{user: string; comment: string}>;
};

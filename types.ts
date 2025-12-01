export interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  freeShipping: boolean;
  fullDelivery: boolean; // "Chega amanhã"
  reviews: number;
  discount?: number;
}

export interface SearchState {
  query: string;
  loading: boolean;
  results: Product[];
  error: string | null;
}
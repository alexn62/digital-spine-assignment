export interface CartProduct {
  quantity: number;
  product: Product;
}

export interface Product {
  _id: string;
  title: string;
  display_image: string;
  description: string;
  brand: string;
  category: string;
  tags: string[];
  available: boolean;
  is_best_seller: boolean;
  price: {
    currency: string;
    value: number;
  };
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  colors: Color[];
  sizes: Size[];
  category: string;
}

export interface Color {
  name: string;
  value: string;
}

export interface Size {
  name: string;
  available: boolean;
}

export interface CartItem {
  product: Product;
  selectedColor: Color;
  selectedSize: Size;
  quantity: number;
}

export interface CheckoutData {
  name: string;
  address: string;
  number: string;
  neighborhood: string;
  cep: string;
  city: string;
  state: string;
  phone: string;
  whatsapp: string;
  isStore?: boolean;
}
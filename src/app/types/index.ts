
export type Language = "dari" | "pashto" | "english";

export type Category =
  | "grains"
  | "oils"
  | "dry-fruits"
  | "fresh-fruits";

export interface Product {
  id: number;
  name: string;
  nameDari: string;
  namePashto: string;
  price: number;
  unit: string;
  category: Category;
  emoji: string;
  descriptionDari: string;
  descriptionPashto: string;
  descriptionEnglish: string;
  audioTextDari: string;
  audioTextPashto: string;
  audioTextEnglish: string;
}

export interface CartItem extends Product {
  quantity: number;
}

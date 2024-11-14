export type Ad = {
  [key: string]: string | number;
  id: string;
  title: string;
  description: string;
  price: number;
  picture: string;
  location: string;
};

export type AdWithoutId<T extends object> = T & {
  [key: string]: string | number;
  title?: string;
  description?: string;
  picture?: string;
  location?: string;
  price?: number;
};
export type AdCreate<T extends object> = T & {
  [key: string]: string | number;
  title: string;
  description: string;
  picture: string;
  location: string;
  price: number;
};
export type PartialAdWithoutId = AdWithoutId<Partial<Omit<Ad, "id">>>;

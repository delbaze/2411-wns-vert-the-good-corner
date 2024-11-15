export type Category = {
  [key: string]: string;
  id: string;
  title: string;
};

export type CategoryWithoutId<T extends object> = T & {
    [key: string]: string | number;
    title?: string;
  };
export type CategoryCreate<T extends object> = T & {
  [key: string]: string;
  title: string;
};

export type PartialCategoryWithoutId = CategoryWithoutId<Partial<Omit<Category, "id">>>;

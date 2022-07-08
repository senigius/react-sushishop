import { TSortValues } from "./slices/filterSlice";

export const discountPricePercent = 1.9;

export const pageItemsLimit = `&limit=${8}`;

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'network error',
  NOITEMS = 'no-items',
}

export const sortValues: TSortValues[] = [
  { sortName: 'популярное', propertyName: 'rating', order: 'desc' },
  { sortName: 'сначала дешевле', propertyName: 'price', order: 'asc' },
  { sortName: 'сначала дороже', propertyName: 'price', order: 'desc' },
];

export const categoriesArr: string[] = ['Все', 'Суши', 'Запеченные суши', 'Острые суши', 'Сашими'];
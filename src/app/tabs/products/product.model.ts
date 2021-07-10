import { Price } from './price.model';

export class Product {
  id: string;
  name: string;
  description: string;
  image: string;
  prices: Price[];
}

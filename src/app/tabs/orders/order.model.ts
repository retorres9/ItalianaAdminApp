export class Order {
  id: string;
  latlng:    string[];
  reference: string;
  userId:    string;
  date: Date;
  state: States;
  cart: Cart[];
}

export interface Cart {
  description:  string;
  id:           string;
  image:        string;
  name:         string;
  prices:       Price[];
  quantity:     number;
  selectedType: number;
  totalAmount:  number;
  type:         string;
  isReady?:     boolean;
}

export interface Price {
  price: number;
  type:  string;
}


export enum States {
  active = 'Active',
  pending = 'Pending',
  denied = 'Denied'
}

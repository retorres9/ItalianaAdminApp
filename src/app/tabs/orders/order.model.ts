export class Order {
  id: string;
  latlng:    string[];
  reference: string;
  userId:    string;
  date: Date;
  state: States;
  cart: any;
}

export enum States {
  active = 'Active',
  pending = 'Pending',
  denied = 'Denied'
}

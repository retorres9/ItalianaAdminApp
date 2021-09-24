export class Coupon {
  constructor(
    public id: string,
    public name: string,
    public url: string,
    public price: number,
    public desc: string,
    public validTo: string
  ) {}
}

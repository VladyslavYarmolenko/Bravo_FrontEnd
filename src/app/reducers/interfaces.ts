export interface IOrder {
  orderNo: number;
  customer: string;
  customerNo: string;
  items: number;
  notes: string;
  ordered: string;
  reqDelivery: string;
  status: boolean;
}

export interface IOrderState {
  [code: string]: IOrder;
}

export interface ICustomer {
  customerNo: string;
  name: string;
  address: string;
  deliveryDays: string;
}

export interface ICustomerState {
  [code: string]: ICustomer;
}

export interface IProduct {
  productCode: string;
  name: string;
  unit: string;
  price: number;
  availability: string;
}

export interface ICatalogState {
  [code: string]: IProduct;
}

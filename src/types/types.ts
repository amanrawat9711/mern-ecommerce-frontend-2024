export type User = {
  name: string;
  email: string;
  photo: string;
  gender: string;
  role: string;
  dob: string;
  _id: string;
};

export type Product = {
  name: string;
  photo: string;
  _id: string;
  category: string;
  stock: number;
  price: number;
};
export type ShippingInfo = {
  address: string;
  state: string;
  country: string;
  pincode: string;
  city: string;
};
export type CartItem = {
  productId: string;
  name: string;
  photo: string;
  price: number;
  quantity: number;
  stock: number;
};
export type OrderItem = {
  name: string;
  photo: string;
  price: number;
  quantity: number;
  productId: string;
  _id: string;
};
export type Order = {
  orderItems: OrderItem[];
  _id: string;
  user: {
    name: string;
    _id: string;
  };
  shippingCharges: number;
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  status: string;
  shippingInfo: ShippingInfo;
};

type CountAndChange = {
  revenue: number;
  product: number;
  user: number;
  order: number;
};
type latestTransaction = {
  _id: string;
  discount: number;
  amount: number;
  quantity: number;
  status: string;
};
export type Stats = {
  categoryCount: Record<string, number>[];
  changePercent: CountAndChange;
  count: CountAndChange;
  chart: {
    order: number[];
    revenue: number[];
  };
  userRatio: {
    male: number;
    female: number;
  };
  latestTransaction: latestTransaction[];
};
type RevenueDistribution = {
  netMargin: number;
  discount: number;
  productionCost: number;
  burnt: number;
  marketingCost: number;
};
type OrderFullfillment = {
  processing: number;
  shipped: number;
  delivered: number;
};
type UserAgeGroups = { teen: number; adult: number; old: number };
export type Pie = {
  orderFullfillment: OrderFullfillment;
  productCategories: Record<string, number>[];
  stockAvailability: {
    inStock: number;
    outOfStock: number;
  };
  revenueDistribution: RevenueDistribution;
  adminCustomer: {
    admin: number;
    customer: number;
  };
  userAgeGroups: UserAgeGroups;
};
export type Bar = {
  products: number[];
  users: number[];
  orders: number[];
}
export type Line = {
  products: number[];
  users: number[];
  discount:number[];
  revenue:number[];
}
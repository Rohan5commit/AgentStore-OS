import { seedBusinesses, seedServices } from "@/data/seed";
import { Business, Order, Service } from "@/lib/types";

const businesses: Business[] = [...seedBusinesses];
const services: Service[] = [...seedServices];
const orders: Order[] = [];

export const db = {
  businesses,
  services,
  orders
};

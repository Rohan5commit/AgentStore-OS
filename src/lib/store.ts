import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { seedBusinesses, seedServices } from "@/data/seed";
import { Business, Order, Service, StoreData } from "@/lib/types";

const dataDir = join(process.cwd(), ".data");
const dataFile = join(dataDir, "store.json");

const initial: StoreData = { businesses: seedBusinesses, services: seedServices, orders: [] };

function ensureStore(): StoreData {
  if (!existsSync(dataDir)) mkdirSync(dataDir, { recursive: true });
  if (!existsSync(dataFile)) {
    writeFileSync(dataFile, JSON.stringify(initial, null, 2));
    return structuredClone(initial);
  }
  try {
    return JSON.parse(readFileSync(dataFile, "utf-8")) as StoreData;
  } catch {
    writeFileSync(dataFile, JSON.stringify(initial, null, 2));
    return structuredClone(initial);
  }
}

let mem = ensureStore();

export function saveStore() {
  writeFileSync(dataFile, JSON.stringify(mem, null, 2));
}

export const db = {
  get businesses(): Business[] { return mem.businesses; },
  get services(): Service[] { return mem.services; },
  get orders(): Order[] { return mem.orders; },
  reset() { mem = structuredClone(initial); saveStore(); }
};

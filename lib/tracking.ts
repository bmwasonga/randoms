import { findShipment, isKnownTrackingNumber } from "./shipments-data";

export type { CustomsEvent, ShipmentDetails } from "./tracking-types";

export function getShipmentByTrackingNumber(trackingNumber: string) {
  return findShipment(trackingNumber);
}

export function isValidTrackingNumber(value: string): boolean {
  return isKnownTrackingNumber(value);
}

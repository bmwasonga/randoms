import {
  BORDER_FACILITY,
  DECLARED_VALUE,
  DELIVERY_CARRIER,
  DELIVERY_CITY,
  GROSS_WEIGHT,
  ORIGIN_COUNTRY,
  ORIGIN_STATE,
  PACKAGE_TYPE,
  POINT_OF_DELIVERY,
  PORT_OF_ENTRY,
} from "./shipment-constants";
import type { CustomsEvent, ShipmentDetails } from "./tracking-types";

type ShipmentRecord = ShipmentRecordFields & {
  aliases: string[];
};

type ShipmentRecordFields = Omit<ShipmentDetails, "trackingNumber"> & {
  trackingNumber: string;
};

type ShipmentInput = {
  trackingNumber: string;
  aliases: string[];
  entryNumber: string;
  currentStatus: string;
  statusCode: string;
  estimatedRelease: string | null;
  itemCustody: string;
  progressIndex: number;
};

function buildEvents(progressIndex: number): CustomsEvent[] {
  const base: Omit<CustomsEvent, "completed">[] = [
    {
      date: "Jun 14, 2025",
      time: "09:42 AM",
      status: "In Transit — En Route to U.S. Border",
      location: "Oregon, USA — Domestic Carrier Network",
      description:
        "Shipment in transit to CBP Portland port of entry (2904) for customs clearance.",
    },
    {
      date: "Jun 17, 2025",
      time: "06:18 AM",
      status: "Arrived at U.S. Border",
      location: PORT_OF_ENTRY,
      description:
        "Shipment arrived at CBP Portland, Oregon. Item received into CBP custody. Manifest validated.",
    },
    {
      date: "Jun 17, 2025",
      time: "11:05 AM",
      status: "Entry Summary Filed",
      location: PORT_OF_ENTRY,
      description:
        "Customs entry summary (CF 7501) filed electronically via ACE. Awaiting CBP review.",
    },
    {
      date: "Jun 18, 2025",
      time: "08:30 AM",
      status: "CBP Document Review",
      location: "U.S. Customs and Border Protection",
      description:
        "Item held in CBP custody. Entry documents under review.",
    },
    {
      date: "Jun 19, 2025",
      time: "10:15 AM",
      status: "Duty Assessment",
      location: PORT_OF_ENTRY,
      description: "Applicable duties and fees calculated. Payment authorization pending.",
    },
    {
      date: "Jun 19, 2025",
      time: "02:40 PM",
      status: "Customs Examination",
      location: PORT_OF_ENTRY,
      description:
        "Item selected for routine examination. Physical inspection in progress at port facility.",
    },
    {
      date: "Jun 20, 2025",
      time: "09:00 AM",
      status: "Customs Release",
      location: PORT_OF_ENTRY,
      description: `CBP released the item. Cleared for pickup by ${DELIVERY_CARRIER}.`,
    },
    {
      date: "Jun 20, 2025",
      time: "01:22 PM",
      status: "Custody Transferred — Safeway Delivery",
      location: `${DELIVERY_CARRIER} — Portland, OR`,
      description: `${DELIVERY_CARRIER} received the item from CBP and assumed custody for home delivery.`,
    },
  ];

  return base.map((event, index) => ({
    ...event,
    completed: index < progressIndex,
  }));
}

function createShipment(input: ShipmentInput): ShipmentRecord {
  return {
    trackingNumber: input.trackingNumber,
    aliases: input.aliases,
    entryNumber: input.entryNumber,
    portOfEntry: PORT_OF_ENTRY,
    borderFacility: BORDER_FACILITY,
    deliveryCarrier: DELIVERY_CARRIER,
    itemCustody: input.itemCustody,
    originCountry: ORIGIN_COUNTRY,
    originState: ORIGIN_STATE,
    destination: "United States",
    pointOfDelivery: POINT_OF_DELIVERY,
    deliveryCity: DELIVERY_CITY,
    packageType: PACKAGE_TYPE,
    weight: GROSS_WEIGHT,
    declaredValue: DECLARED_VALUE,
    importerOfRecord: "CONSIGNEE — ON FILE",
    currentStatus: input.currentStatus,
    statusCode: input.statusCode,
    estimatedRelease: input.estimatedRelease,
    events: buildEvents(input.progressIndex),
  };
}

const SHIPMENTS: ShipmentRecord[] = [
  createShipment({
    trackingNumber: "1Z88X5W20345678912",
    aliases: ["25-290-482917", "25290482917"],
    entryNumber: "25-290-482917",
    currentStatus: "Held — Document Review",
    statusCode: "DOC-HOLD",
    estimatedRelease: "+2 business days",
    itemCustody: "U.S. Customs and Border Protection — Portland, OR (2904)",
    progressIndex: 3,
  }),
  createShipment({
    trackingNumber: "784912345678945",
    aliases: ["25-290-591034", "25290591034"],
    entryNumber: "25-290-591034",
    currentStatus: "In Transit — En Route to U.S. Border",
    statusCode: "IN-TRNST",
    estimatedRelease: "+3 business days",
    itemCustody: "In transit to CBP Portland port of entry",
    progressIndex: 0,
  }),
];

function normalizeKey(value: string): string {
  return value.trim().toUpperCase().replace(/\s+/g, "");
}

const LOOKUP = new Map<string, ShipmentRecord>();

for (const shipment of SHIPMENTS) {
  for (const alias of [shipment.trackingNumber, ...shipment.aliases]) {
    LOOKUP.set(normalizeKey(alias), shipment);
  }
}

export function findShipment(query: string): ShipmentDetails | null {
  const record = LOOKUP.get(normalizeKey(query));
  if (!record) return null;

  const { aliases: _, ...shipment } = record;
  return shipment;
}

export function isKnownTrackingNumber(value: string): boolean {
  return LOOKUP.has(normalizeKey(value));
}

export function getPrimaryTrackingNumber(): string {
  return SHIPMENTS[0].trackingNumber;
}

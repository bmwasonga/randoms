export type CustomsEvent = {
  date: string;
  time: string;
  status: string;
  location: string;
  description: string;
  completed: boolean;
};

export type ShipmentDetails = {
  trackingNumber: string;
  entryNumber: string;
  portOfEntry: string;
  borderFacility: string;
  deliveryCarrier: string;
  itemCustody: string;
  originCountry: string;
  originState: string;
  destination: string;
  pointOfDelivery: string;
  deliveryCity: string;
  packageType: string;
  weight: string;
  declaredValue: string;
  importerOfRecord: string;
  currentStatus: string;
  statusCode: string;
  estimatedRelease: string | null;
  events: CustomsEvent[];
};

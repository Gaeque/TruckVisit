export type TransactionsDTO = {
  gkey: number;
  truckID: string;
  driverLicenseNBR: string;
  driverName: string;
  entered: string;
  exited: string;
  truckGkey: number;
  driverGkey: number;
  containers: {
    ID: string;
    type: string;
    position: string;
  }[];
};

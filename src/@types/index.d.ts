export type SalesRepresentative = {
  agentName: string;
  agentCode: number;
};

export type SalesRepresentativeInput = {
  authorization: string,
};

export type FilterSalesRepresentativeInput = {
  representatives?: SalesRepresentative[],
  params?: {
    isB2B?: boolean,
    isB2C?: boolean;
  };
};

export type GetSalesIndicatorInput = {
  authorization: string;
  days_to_subtract?: number;
  b2b?: boolean | undefined;
  b2c?: boolean | undefined;
  agent_code?: number | undefined;
};

export type GetSalesIndicatorOutput = {
  current: {
    quantityOfOrders: number;
    itemsSold: number;
    ordersValue: number;
  },
  lastPeriod: {
    quantityOfOrders: number;
    itemsSold: number;
    ordersValue: number;
  };
};
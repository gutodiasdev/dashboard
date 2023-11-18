import { Alert } from "@mui/material";
import { ReactNode, createContext, useState } from "react";
import { FilterSalesRepresentativeInput, GetSalesIndicatorInput, GetSalesIndicatorOutput, SalesRepresentative, SalesRepresentativeInput } from "../@types";
import { api } from "../config/api";

interface ListContextProps {
  filterRepresentativeList(input: FilterSalesRepresentativeInput): SalesRepresentative[] | undefined;
  fetchSalesRepresentative(input: SalesRepresentativeInput): Promise<SalesRepresentative[]>;
  getSalesIndicator(input: GetSalesIndicatorInput): Promise<GetSalesIndicatorOutput>;
  isB2BType: boolean | undefined;
  isB2CType: boolean | undefined;
  currentRepresentative: SalesRepresentative | undefined;
  daysToSubtract: number | undefined;
  setIsB2BType: React.Dispatch<React.SetStateAction<boolean>>;
  setIsB2CType: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentRepresentative: React.Dispatch<React.SetStateAction<SalesRepresentative | undefined>>;
  setDaysToSubtract: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export const ListContext = createContext<ListContextProps>({} as ListContextProps);

export const ListContextProvider = ({ children }: { children: ReactNode; }) => {
  const [isB2BType, setIsB2BType] = useState<boolean>(false);
  const [isB2CType, setIsB2CType] = useState<boolean>(false);
  const [currentRepresentative, setCurrentRepresentative] = useState<SalesRepresentative | undefined>(undefined);
  const [daysToSubtract, setDaysToSubtract] = useState<number | undefined>(7);

  async function fetchSalesRepresentative(input: SalesRepresentativeInput): Promise<SalesRepresentative[]> {
    const { data } = await api.get<SalesRepresentative[]>("/measured_order/order_agents", {
      headers: {
        Authorization: `Bearer ${input.authorization}`
      }
    });
    return data;
  }

  function filterRepresentativeList(input: FilterSalesRepresentativeInput): SalesRepresentative[] | undefined {
    if (!input.representatives) {
      <Alert severity="error" color="error">Não há representate válido</Alert>;
    }

    if (input.params?.isB2B && !input.params?.isB2C) {
      return input.representatives?.filter(representatives => representatives.agentCode < 600);
    }
    if (input.params?.isB2C && !input.params?.isB2B) {
      return input.representatives?.filter(representatives => representatives.agentCode >= 600);
    }
    return input.representatives;
  }

  async function getSalesIndicator(input: GetSalesIndicatorInput): Promise<GetSalesIndicatorOutput> {
    const { data } = await api.get<GetSalesIndicatorOutput>("/measured_order/grouped_sales", {
      params: {
        b2b: isB2BType,
        b2c: isB2CType,
        agent_code: currentRepresentative?.agentCode,
        days_to_subtract: daysToSubtract
      },
      headers: {
        Authorization: `Bearer ${input.authorization}`
      }
    });
    return data
  }

  return (
    <ListContext.Provider value={{ fetchSalesRepresentative, filterRepresentativeList, isB2BType, isB2CType, setIsB2BType, setIsB2CType, currentRepresentative, setCurrentRepresentative, daysToSubtract, setDaysToSubtract, getSalesIndicator }}>
      {children}
    </ListContext.Provider>
  );
};
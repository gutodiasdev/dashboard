import { FormControl, InputLabel, NativeSelect } from "@mui/material";
import { FormEvent, useContext } from "react";
import { SalesRepresentative } from "../@types";
import { ListContext } from "../contexts";
import { queryClient } from "../main";

export function SelectSalesRepresentative() {
  const { filterRepresentativeList, isB2BType, isB2CType, setCurrentRepresentative } = useContext(ListContext);
  const cachedRepresentatives: SalesRepresentative[] | undefined = queryClient.getQueryData(["all-representatives"]);
  const data = filterRepresentativeList({ representatives: cachedRepresentatives, params: { isB2B: isB2BType, isB2C: isB2CType } })

  const handleRepresentativeSelection = (event: FormEvent<HTMLSelectElement>) => {
    const value = JSON.parse(event.currentTarget.value)
    setCurrentRepresentative(value);
  }

  return (
    <FormControl>
      <InputLabel htmlFor="representatives">Representante</InputLabel>
      <NativeSelect
        inputProps={{
          name: "representatives",
          id: "representatives"
        }}
        sx={{
          minWidth: 360
        }}
        onChange={handleRepresentativeSelection}
      >
        <option value={undefined}>Escolha um representante</option>
        {
          cachedRepresentatives && data?.map((representative, index) => {
            return (
              <option key={index} value={JSON.stringify({ agentCode: representative.agentCode, agentName: representative.agentName })}>{representative.agentName}</option>
            )
          })
        }
      </NativeSelect>
    </FormControl>
  );
}
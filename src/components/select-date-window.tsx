import { FormControl, InputLabel, NativeSelect } from "@mui/material";
import dayjs from "dayjs";
import dayOfYear from "dayjs/plugin/dayOfYear";
import { useContext } from "react";
import { ListContext } from "../contexts";

export function SelectDateWindow() {
  const { setDaysToSubtract } = useContext(ListContext);

  const date = dayjs();
  dayjs.extend(dayOfYear);
  
  return (
    <FormControl>
      <InputLabel variant="standard" htmlFor="days-period">
        Período 
      </InputLabel>
      <NativeSelect
        inputProps={{
          name: "days-period",
          id: "days-period"
        }}
        onChange={(event) => setDaysToSubtract(Number(event.currentTarget.value))}
        defaultValue={7}
      >
        <option value={7}>Últimos 7 dias</option>
        <option value={30}>Últimos 30 dias</option>
        <option value={60}>Últimos 60 dias</option>
        <option value={90}>Últimos 90 dias</option>
        <option value={date.dayOfYear()}>Este ano</option>
        <option value={365}>Últimos 365 dias</option>
      </NativeSelect>
    </FormControl>
  )
}
import { Box, Checkbox, FormControlLabel, FormGroup, InputLabel } from "@mui/material";
import { useContext } from "react";
import { ListContext } from "../contexts";

export function SelectBusinessType() {
  const { setIsB2BType, isB2BType, setIsB2CType, isB2CType } = useContext(ListContext);
  return (
    <FormGroup>
      <InputLabel>Tipos de representantes</InputLabel>
      <Box sx={{ display: "flex", gap: 4 }}>
        <FormControlLabel control={<Checkbox onChange={() => setIsB2BType(!isB2BType)} />} label="B2B" />
        <FormControlLabel control={<Checkbox onChange={() => setIsB2CType(!isB2CType)} />} label="B2C" />
      </Box>
    </FormGroup>
  );
}
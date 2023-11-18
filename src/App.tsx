import { Box } from "@mui/material";
import { useContext } from "react";
import { useQuery } from "react-query";
import './App.css';
import { RepresentativeSalesIndicator, SelectBusinessType, SelectDateWindow, SelectSalesRepresentative } from "./components";
import { token } from "./config";
import { ListContext } from "./contexts";


function App() {
  const { fetchSalesRepresentative, currentRepresentative } = useContext(ListContext);

  useQuery(["all-representatives"], {
    queryFn: async () => await fetchSalesRepresentative({ authorization: token }),
    staleTime: 1000 * 60 * 15,
    cacheTime: 1000 * 60 * 15
  });

  return (
    <Box sx={{ minWidth: "1280px", maxWidth: "1440px", display: "flex", flexDirection: "column", justifyItems: "flex-start", minHeight: "100vh" }}>
      <Box sx={{ display: "flex", gap: 8, alignItems: "center", border: "solid 1px #cacaca", padding: 4, borderRadius: 4 }}>
        <SelectSalesRepresentative />
        <SelectBusinessType />
        <SelectDateWindow />
      </Box>
      {currentRepresentative && <RepresentativeSalesIndicator />}
    </Box>
  );
}

export default App;

import { Box } from "@mui/system";
import Plot from "react-plotly.js";
import "./Graphs.css";

const Graphs = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box padding={"20px"} width="100%">
        {/**TODO:GRAFICO1**/}
        <Plot
          data={[
            {
              x: [1, 2, 3],
              y: [2, 6, 3],
              type: "scatter",
              mode: "lines+markers",
              marker: { color: "red" },
            },
            { type: "bar", x: [1, 2, 3], y: [2, 5, 3] },
          ]}
          layout={{
            width: "100%",
            height: "max-content",
            title: "Reporte de ventas",
            margin: { autoexpand: true },
          }}
          config={{
            responsive: true,
            displaylogo: false,
            showLink: true,
            plotlyServerURL: "https://chart-studio.plotly.com",
          }}
          style={{ padding: "0px !important", width: "100%" }}
        />
      </Box>
    </Box>
  );
};
export default Graphs;

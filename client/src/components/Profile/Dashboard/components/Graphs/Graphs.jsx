import { ResponsiveBar } from "@nivo/bar";
import { useSelector } from "react-redux";

const Graphs = ({ data }) => {
  const theme = useSelector((store) => store.theme);
  const mode = useSelector((store) => store.theme.mode);
  console.log("FROM component", data);
  return (
    <ResponsiveBar
      data={data.data}
      keys={data.keys}
      theme={{
        // added
        axis: {
          domain: {
            line: {
              stroke: theme[mode].textPrimary,
            },
          },
          legend: {
            text: {
              fill: theme[mode].textPrimary,
            },
          },
          ticks: {
            line: {
              stroke: theme[mode].textPrimary,
              strokeWidth: 1,
            },
            text: {
              fill: theme[mode].textPrimary,
            },
          },
        },
        legends: {
          text: {
            fill: theme[mode].textPrimary,
          },
        },
      }}
      indexBy="country"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "PAIS",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "cantidad por producto",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              sztyle: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      role="application"
      ariaLabel="Nivo bar chart demo"
      barAriaLabel={function (e) {
        return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
      }}
    />
  );
};
export default Graphs;

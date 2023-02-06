import { ResponsiveBar } from "@nivo/bar";
const data = [
  {
    country: "AD",
    "hot dog": 191,
    "hot dogColor": "hsl(278, 70%, 50%)",
    burger: 23,
    burgerColor: "hsl(301, 70%, 50%)",
    sandwich: 117,
    sandwichColor: "hsl(25, 70%, 50%)",
    kebab: 137,
    kebabColor: "hsl(205, 70%, 50%)",
    fries: 96,
    friesColor: "hsl(137, 70%, 50%)",
    donut: 166,
    donutColor: "hsl(153, 70%, 50%)",
  },
  {
    country: "AE",
    "hot dog": 98,
    "hot dogColor": "hsl(65, 70%, 50%)",
    burger: 80,
    burgerColor: "hsl(39, 70%, 50%)",
    sandwich: 86,
    sandwichColor: "hsl(2, 70%, 50%)",
    kebab: 117,
    kebabColor: "hsl(39, 70%, 50%)",
    fries: 168,
    friesColor: "hsl(83, 70%, 50%)",
    donut: 164,
    donutColor: "hsl(219, 70%, 50%)",
  },
  {
    country: "AF",
    "hot dog": 22,
    "hot dogColor": "hsl(160, 70%, 50%)",
    burger: 196,
    burgerColor: "hsl(3, 70%, 50%)",
    sandwich: 76,
    sandwichColor: "hsl(269, 70%, 50%)",
    kebab: 8,
    kebabColor: "hsl(210, 70%, 50%)",
    fries: 176,
    friesColor: "hsl(321, 70%, 50%)",
    donut: 160,
    donutColor: "hsl(225, 70%, 50%)",
  },
  {
    country: "AG",
    "hot dog": 162,
    "hot dogColor": "hsl(46, 70%, 50%)",
    burger: 186,
    burgerColor: "hsl(115, 70%, 50%)",
    sandwich: 112,
    sandwichColor: "hsl(214, 70%, 50%)",
    kebab: 163,
    kebabColor: "hsl(189, 70%, 50%)",
    fries: 41,
    friesColor: "hsl(242, 70%, 50%)",
    donut: 172,
    donutColor: "hsl(336, 70%, 50%)",
  },
  {
    country: "AI",
    "hot dog": 54,
    "hot dogColor": "hsl(43, 70%, 50%)",
    burger: 41,
    burgerColor: "hsl(280, 70%, 50%)",
    sandwich: 150,
    sandwichColor: "hsl(353, 70%, 50%)",
    kebab: 144,
    kebabColor: "hsl(51, 70%, 50%)",
    fries: 150,
    friesColor: "hsl(236, 70%, 50%)",
    donut: 92,
    donutColor: "hsl(11, 70%, 50%)",
  },
  {
    country: "AL",
    "hot dog": 113,
    "hot dogColor": "hsl(309, 70%, 50%)",
    burger: 119,
    burgerColor: "hsl(318, 70%, 50%)",
    sandwich: 63,
    sandwichColor: "hsl(261, 70%, 50%)",
    kebab: 196,
    kebabColor: "hsl(319, 70%, 50%)",
    fries: 173,
    friesColor: "hsl(41, 70%, 50%)",
    donut: 4,
    donutColor: "hsl(338, 70%, 50%)",
  },
  {
    country: "AM",
    "hot dog": 94,
    "hot dogColor": "hsl(142, 70%, 50%)",
    burger: 79,
    burgerColor: "hsl(68, 70%, 50%)",
    sandwich: 108,
    sandwichColor: "hsl(107, 70%, 50%)",
    kebab: 109,
    kebabColor: "hsl(279, 70%, 50%)",
    fries: 131,
    friesColor: "hsl(208, 70%, 50%)",
    donut: 157,
    donutColor: "hsl(82, 70%, 50%)",
  },
];
const Graphs = () => {
  return (
    <ResponsiveBar
      data={data}
      keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]}
      indexBy="country"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      fill={[
        {
          match: {
            id: "fries",
          },
          id: "dots",
        },
        {
          match: {
            id: "sandwich",
          },
          id: "lines",
        },
      ]}
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
        legend: "country",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "food",
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
              style: {
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

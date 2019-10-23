import React from 'react'
import { ResponsiveBar } from '@nivo/bar'

export const BarChart = ({ data }) => {
  data = data || [
    {
      "country": "AD",
      "hot dog": 111,
      "hot dogColor": "hsl(20, 70%, 50%)",
      "burger": 179,
      "burgerColor": "hsl(83, 70%, 50%)",
      "sandwich": 172,
      "sandwichColor": "hsl(182, 70%, 50%)",
      "kebab": 39,
      "kebabColor": "hsl(199, 70%, 50%)",
      "fries": 18,
      "friesColor": "hsl(281, 70%, 50%)",
      "donut": 116,
      "donutColor": "hsl(220, 70%, 50%)"
    },
    {
      "country": "AE",
      "hot dog": 158,
      "hot dogColor": "hsl(83, 70%, 50%)",
      "burger": 143,
      "burgerColor": "hsl(225, 70%, 50%)",
      "sandwich": 8,
      "sandwichColor": "hsl(116, 70%, 50%)",
      "kebab": 117,
      "kebabColor": "hsl(323, 70%, 50%)",
      "fries": 74,
      "friesColor": "hsl(331, 70%, 50%)",
      "donut": 72,
      "donutColor": "hsl(227, 70%, 50%)"
    },
    {
      "country": "AF",
      "hot dog": 5,
      "hot dogColor": "hsl(336, 70%, 50%)",
      "burger": 79,
      "burgerColor": "hsl(263, 70%, 50%)",
      "sandwich": 137,
      "sandwichColor": "hsl(213, 70%, 50%)",
      "kebab": 57,
      "kebabColor": "hsl(187, 70%, 50%)",
      "fries": 6,
      "friesColor": "hsl(155, 70%, 50%)",
      "donut": 197,
      "donutColor": "hsl(285, 70%, 50%)"
    },
    {
      "country": "AG",
      "hot dog": 46,
      "hot dogColor": "hsl(4, 70%, 50%)",
      "burger": 135,
      "burgerColor": "hsl(91, 70%, 50%)",
      "sandwich": 20,
      "sandwichColor": "hsl(336, 70%, 50%)",
      "kebab": 194,
      "kebabColor": "hsl(71, 70%, 50%)",
      "fries": 129,
      "friesColor": "hsl(133, 70%, 50%)",
      "donut": 97,
      "donutColor": "hsl(64, 70%, 50%)"
    },
    {
      "country": "AI",
      "hot dog": 97,
      "hot dogColor": "hsl(172, 70%, 50%)",
      "burger": 121,
      "burgerColor": "hsl(323, 70%, 50%)",
      "sandwich": 182,
      "sandwichColor": "hsl(163, 70%, 50%)",
      "kebab": 74,
      "kebabColor": "hsl(354, 70%, 50%)",
      "fries": 20,
      "friesColor": "hsl(222, 70%, 50%)",
      "donut": 100,
      "donutColor": "hsl(17, 70%, 50%)"
    },
    {
      "country": "AL",
      "hot dog": 200,
      "hot dogColor": "hsl(265, 70%, 50%)",
      "burger": 17,
      "burgerColor": "hsl(249, 70%, 50%)",
      "sandwich": 50,
      "sandwichColor": "hsl(191, 70%, 50%)",
      "kebab": 118,
      "kebabColor": "hsl(194, 70%, 50%)",
      "fries": 121,
      "friesColor": "hsl(163, 70%, 50%)",
      "donut": 24,
      "donutColor": "hsl(356, 70%, 50%)"
    },
    {
      "country": "AM",
      "hot dog": 180,
      "hot dogColor": "hsl(196, 70%, 50%)",
      "burger": 14,
      "burgerColor": "hsl(134, 70%, 50%)",
      "sandwich": 90,
      "sandwichColor": "hsl(218, 70%, 50%)",
      "kebab": 198,
      "kebabColor": "hsl(272, 70%, 50%)",
      "fries": 39,
      "friesColor": "hsl(89, 70%, 50%)",
      "donut": 74,
      "donutColor": "hsl(36, 70%, 50%)"
    }
  ]

  return <div className='h-1 flex-grow' onClick={e => resetData()}>
    <ResponsiveBar
      data={data}
      keys={['hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut']}
      indexBy="country"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      colors={{ scheme: 'nivo' }}
      defs={[
        {
          id: 'dots',
          type: 'patternDots',
          background: 'inherit',
          color: '#38bcb2',
          size: 4,
          padding: 1,
          stagger: true
        },
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: '#eed312',
          rotation: -45,
          lineWidth: 6,
          spacing: 10
        }
      ]}
      fill={[
        {
          match: {
            id: 'fries'
          },
          id: 'dots'
        },
        {
          match: {
            id: 'sandwich'
          },
          id: 'lines'
        }
      ]}
      borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'country',
        legendPosition: 'middle',
        legendOffset: 32
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'food',
        legendPosition: 'middle',
        legendOffset: -40
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      legends={[
        {
          dataFrom: 'keys',
          anchor: 'bottom-right',
          direction: 'column',
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: 'left-to-right',
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: 'hover',
              style: {
                itemOpacity: 1
              }
            }
          ]
        }
      ]}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
      onClick={thing => console.log(thing)}
    />
  </div>
}

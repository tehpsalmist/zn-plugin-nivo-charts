import React, { useState, useEffect } from 'react'
import { ResponsiveRadar } from '@nivo/radar'
import { client } from '../zengine'

export const RadarChart = ({ context }) => {
  const [data, setData] = useState([
    {
      "taste": "fruity",
      "chardonay": 116,
      "carmenere": 84,
      "syrah": 71
    },
    {
      "taste": "bitter",
      "chardonay": 62,
      "carmenere": 62,
      "syrah": 96
    },
    {
      "taste": "heavy",
      "chardonay": 82,
      "carmenere": 68,
      "syrah": 20
    },
    {
      "taste": "strong",
      "chardonay": 33,
      "carmenere": 32,
      "syrah": 71
    },
    {
      "taste": "sunny",
      "chardonay": 108,
      "carmenere": 96,
      "syrah": 116
    }
  ])

  useEffect(() => {
    console.log(context.workspace.forms)
  })

  return <div className='h-1 flex-grow' onClick={e => resetData()}>
    <ResponsiveRadar
      data={data}
      keys={['chardonay', 'carmenere', 'syrah']}
      indexBy="taste"
      maxValue="auto"
      margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
      curve="linearClosed"
      borderWidth={2}
      borderColor={{ from: 'color' }}
      gridLevels={5}
      gridShape="circular"
      gridLabelOffset={36}
      enableDots={true}
      dotSize={10}
      dotColor={{ theme: 'background' }}
      dotBorderWidth={2}
      dotBorderColor={{ from: 'color' }}
      enableDotLabel={true}
      dotLabel="value"
      dotLabelYOffset={-12}
      colors={{ scheme: 'nivo' }}
      fillOpacity={0.25}
      blendMode="multiply"
      animate={true}
      motionStiffness={90}
      motionDamping={15}
      isInteractive={true}
      legends={[
        {
          anchor: 'top-left',
          direction: 'column',
          translateX: -50,
          translateY: -40,
          itemWidth: 80,
          itemHeight: 20,
          itemTextColor: '#999',
          symbolSize: 12,
          symbolShape: 'circle',
          effects: [
            {
              on: 'hover',
              style: {
                itemTextColor: '#000'
              }
            }
          ]
        }
      ]}
    />
  </div>
}

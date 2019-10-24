import React, { useState } from 'react'
import { AlbersUsa, Graticule } from '@vx/geo'
import { saveRecords } from '../zengine'

export const GeoChart = ({ context }) => {
  if (context.loading) return <h2 className='text-3xl text-center'>Loading...</h2>

  const [error, setError] = useState('')

  if (error) return error

  const [data, setData] = useState([
    {
      "id": "go",
      "label": "go",
      "value": 47,
      "color": "hsl(107, 70%, 50%)"
    },
    {
      "id": "rust",
      "label": "rust",
      "value": 543,
      "color": "hsl(132, 70%, 50%)"
    },
    {
      "id": "haskell",
      "label": "haskell",
      "value": 154,
      "color": "hsl(97, 70%, 50%)"
    },
    {
      "id": "javascript",
      "label": "javascript",
      "value": 534,
      "color": "hsl(32, 70%, 50%)"
    },
    {
      "id": "css",
      "label": "css",
      "value": 354,
      "color": "hsl(259, 70%, 50%)"
    }
  ])

  return <div className='h-1 flex-grow' onClick={e => console.log('outer')}>
    <svg height='500px' width='700px'>
      <AlbersUsa data={data}>
        {props => {
          console.log(props)
          return <g>
            <Graticule graticule={g => props.path(g)} stroke='purple' />
            {props.features.map((feature, i) => {
              const { feature: f } = feature;
              return (
                <path
                  key={`map-feature-${i}`}
                  d={feature.path}
                  fill='blue'
                  stroke='white'
                  strokeWidth={0.5}
                  onClick={event => {
                    alert(`Clicked: ${f.properties.name} (${f.id})`);
                  }}
                />
              );
            })}
          </g>
        }}
      </AlbersUsa>
    </svg>
  </div>
}

import React, { useState, useEffect } from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { getRecords, saveRecords } from '../zengine'
import { pSBC } from '../utilities'

export const BarChart = ({ context }) => {
  if (context.loading) return 'Loading...'

  const [error, setError] = useState('')

  if (error) return error

  const [data, setData] = useState([
    {
      year: '2016',
      'Submitted': 111,
      'In Review': 179,
      'Draft': 172,
      'Ineligible': 39,
      'Awarded': 18,
      'Invite to Apply': 116,
      'Uncategorized': 5
    },
    {
      year: '2017',
      'Submitted': 158,
      'In Review': 143,
      'Draft': 8,
      'Ineligible': 117,
      'Awarded': 74,
      'Invite to Apply': 72,
      'Uncategorized': 5
    },
    {
      year: '2018',
      'Submitted': 5,
      'In Review': 79,
      'Draft': 137,
      'Ineligible': 57,
      'Awarded': 6,
      'Invite to Apply': 197,
      'Uncategorized': 5
    },
    {
      year: '2019',
      'Submitted': 46,
      'In Review': 135,
      'Draft': 20,
      'Ineligible': 194,
      'Awarded': 129,
      'Invite to Apply': 97,
      'Uncategorized': 5
    },
    {
      year: '2020',
      'Submitted': 97,
      'In Review': 121,
      'Draft': 182,
      'Ineligible': 74,
      'Awarded': 20,
      'Invite to Apply': 100,
      'Uncategorized': 5
    }
  ])

  const [vertical, setVertical] = useState(true)
  const [{ selectedColor = '#ffffff', selectedId = '' }, setSelection] = useState({})

  const folders = (context.workspace.forms.find(f => f.id === 11978) || { folders: [] })
    .folders.reduce((map, f) => ({ ...map, [f.id]: f.name }), {})

  useEffect(() => {
    getRecords(11978)
      .then(applications => {
        if (error) setError('')

        // console.log(applications)

        // const newApps = applications.map(({ id }) => ({
        //   id,
        //   'folder.id': Number(Object.keys(folders)[Math.ceil(Math.random() * 6)])
        // }))

        // saveRecords(11978, newApps)
        //   .then(data => console.log('saved:', data))
        //   .catch(err => console.error('error:', err))

        const map = applications.reduce((m, a) => ({
          ...m,
          [a.field83465]: m[a.field83465] ? m[a.field83465].concat([a]) : [a]
        }), {})

        const newData = Object.keys(map).map(year => {
          const dataObject = { year }

          map[year].forEach(app => {
            const folderName = folders[app.folder.id] || 'Uncategorized'

            if (!dataObject[folderName]) {
              dataObject[folderName] = 1
              dataObject[`${folderName}Apps`] = [app.name]
            } else {
              dataObject[folderName]++
              dataObject[`${folderName}Apps`].push(app.name)
            }
          })

          return dataObject
        })

        setData(newData)
      })
      .catch(err => setError('Error Fetching Records'))
  }, [])

  return <div className='h-1 flex-grow relative'>
    <button
      type='button'
      className='absolute top-0 right-0 p-2 mr-2 rounded-lg text-white bg-blue-500 shadow-md hover:bg-blue-600 focus:bg-blue-700 z-50 focus:outline-none'
      onClick={e => setVertical(!vertical)}
    >
      {vertical ? 'Horizontal' : 'Vertical'}
    </button>
    <ResponsiveBar
      data={data}
      keys={['Submitted', 'In Review', 'Draft', 'Ineligible', 'Awarded', 'Invite to Apply', 'Uncategorized']}
      indexBy='year'
      layout={vertical ? 'vertical' : 'horizontal'}
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      colors={{ scheme: 'nivo' }}
      defs={[
        {
          id: 'lines',
          type: 'patternLines',
          background: 'inherit',
          color: pSBC(-0.2, selectedColor),
          rotation: -45,
          lineWidth: 6,
          spacing: 10
        }
      ]}
      fill={[
        {
          match: {
            id: selectedId
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
        legend: vertical ? 'Year' : 'Applications',
        legendPosition: 'middle',
        legendOffset: 32
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: vertical ? 'Applications' : 'Year',
        legendPosition: 'middle',
        legendOffset: -45
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
      theme={{
        axis: {
          legend: {
            text: {
              fontSize: 24,
              fill: '#888888'
            }
          }
        }
      }}
      tooltip={info => {
        return <div className='flex flex-col items-center'>
          <h5 className='w-full text-center mb-4'>
            <span className='font-semibold'>{info.indexValue}:</span>
            {' '}
            <em>{info.id}</em>
            {' '}
            ({info.value})
          </h5>
          {info.data[`${info.id}Apps`].map(name => <p className='text-sm' key={name}>{name}</p>)}
        </div>
      }}
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
          onMouseEnter: ({ id, color }) => setSelection({ selectedColor: color, selectedId: id }),
          onMouseLeave: () => setSelection({}),
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
    />
  </div>
}

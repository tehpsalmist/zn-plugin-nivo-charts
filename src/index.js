import React, { useContext, useState } from 'react'
import { render } from 'react-dom'
import { ZengineContext, ZengineProvider } from './zengine'
import { /*GeoChart,*/ BarChart, RadarChart } from './components'

const buttonClass = 'px-2 py-1 mx-1 bg-green-500 shadow-md text-white rounded-lg hover:bg-green-600 focus:outline-none'

export const App = props => {
  const context = useContext(ZengineContext)
  const [selection, setSelection] = useState('')

  if (context.loading) return <main className='flex-center h-screen text-3xl'>Loading...</main>

  let chart

  switch (selection) {
    // case 'geo':
    //   chart = <GeoChart context={context} />
    //   break
    case 'bar':
      chart = <BarChart context={context} />
      break
    case 'radar':
      chart = <RadarChart context={context} />
      break
    default:
      chart = 'Please Select a Chart'
      break
  }

  return <main className='min-h-screen w-full flex flex-col'>
    <div className='h-16 flex justify-center items-center'>
      {/* <button
        className={`${buttonClass} ${selection === 'geo' ? 'bg-green-700' : ''}`}
        onClick={e => setSelection('geo')}>
        Geo Chart
      </button> */}
      <button
        className={`${buttonClass} ${selection === 'bar' ? 'bg-green-700' : ''}`}
        onClick={e => setSelection('bar')}>
        Bar Chart
      </button>
      <button
        className={`${buttonClass} ${selection === 'radar' ? 'bg-green-700' : ''}`}
        onClick={e => setSelection('radar')}>
        Radar Chart
      </button>
      <button
        className={`${buttonClass} ${selection === '' ? 'bg-green-700' : ''}`}
        onClick={e => setSelection('')}>
        No Chart
      </button>
    </div>
    {chart}
  </main>
}

render(<ZengineProvider><App /></ZengineProvider>, document.getElementById('app'))

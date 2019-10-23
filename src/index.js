import '@babel/polyfill'
import React, { useContext, useState } from 'react'
import { render } from 'react-dom'
import { ZengineContext, ZengineProvider } from './zengine'
import { PieChart, BarChart, RadarChart } from './components'

const buttonClass = 'px-2 py-1 mx-1 bg-green-600 text-white rounded-lg'

export const App = props => {
  const context = useContext(ZengineContext)
  const [selection, setSelection] = useState('')

  if (context.loading) return <main className='flex-center h-screen text-3xl'>Loading...</main>

  let chart

  switch (selection) {
    case 'pie':
      chart = <PieChart />
      break
    case 'bar':
      chart = <BarChart />
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
      <button className={buttonClass} onClick={e => setSelection('pie')}>Pie Chart</button>
      <button className={buttonClass} onClick={e => setSelection('bar')}>Bar Chart</button>
      <button className={buttonClass} onClick={e => setSelection('radar')}>Radar Chart</button>
      <button className={buttonClass} onClick={e => setSelection('')}>Clear Chart</button>
    </div>
    {chart}
  </main>
}

render(<ZengineProvider><App /></ZengineProvider>, document.getElementById('app'))

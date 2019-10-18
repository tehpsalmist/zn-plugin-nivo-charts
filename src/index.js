import React, { useContext } from 'react'
import { render } from 'react-dom'
import { ZengineContext, ZengineProvider } from './zengine'
import { PieChart } from './components'

export const App = props => {
  const context = useContext(ZengineContext)

  console.log(context)

  return <main className='min-h-screen w-full'>
    Hello World!
    <PieChart />
  </main>
}

render(<ZengineProvider><App /></ZengineProvider>, document.getElementById('app'))

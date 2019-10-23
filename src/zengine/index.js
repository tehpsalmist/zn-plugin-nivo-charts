import React, { createContext, useState, useEffect } from 'react'
import Client from '@zenginehq/post-rpc-client'

export const ZengineContext = createContext({})

export const client = new Client(document.location.ancestorOrigins[0])

client.start()

export const ZengineProvider = props => {
  const [zContext, setZContext] = useState({ loading: true })

  useEffect(() => {
    client.call({ method: 'context' })
      .then(data => {
        setZContext(data)
      })
      .catch((err) => {
        console.error(err)
      })
  }, [])

  return <ZengineContext.Provider value={{ ...props, ...zContext }}>
    {props.children}
  </ZengineContext.Provider>
}

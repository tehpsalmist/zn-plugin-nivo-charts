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
        data.fields = data.workspace.forms.reduce((map, form) => ({
          ...map,
          ...form.fields.reduce((fields, field) => ({
            ...fields,
            [`field${field.id}`]: field
          }), {})
        }), {})

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

export const getRecords = form => client.call({
  method: 'znHttp',
  args: {
    options: { apiVersion: 'v1' },
    request: { method: 'get', url: `/forms/${form}/records?limit=100` }
  }
}).then(data => data.data.data)

export const saveRecords = (form, data) => client.call({
  method: 'znHttp',
  args: {
    options: { apiVersion: 'v1' },
    request: { method: 'post', url: `/forms/${form}/records`, data }
  }
})

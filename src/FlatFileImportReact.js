import React from 'react'
import { FlatfileButton } from '@flatfile/react'

const FlatFileImportReact = ({ token, onSuccess }) => {
  return (
    <>
      <FlatfileButton
        token={token}
        onInit={(p) => {
          console.log(`onInit ${JSON.stringify(p)}`)
        }}
        onLaunch={(p) => {
          console.log(`onLaunch ${JSON.stringify(p)}`)
        }}
        onClose={() => {
          console.log('onClose')
        }}
        onComplete={async (payload) => {
          const data = await payload.data()
          console.log(`onComplete ${JSON.stringify(data, null, 4)}`)
          onSuccess(data)
        }}
        onError={(e) => {
          console.log(`onError ${JSON.stringify(e)}`)
          console.error(e)
        }}
        render={(payload) => {
          return (
            <button
              onClick={() => {
                payload.launch()
              }}
            >
              Launch
            </button>
          )
        }}
      />
    </>
  )
}

export default FlatFileImportReact

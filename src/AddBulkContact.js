/* eslint-disable */
import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import FlatFileImportReact from '../src/FlatFileImportReact'

const AddBulkContact = ({ show, onSuccess, setShow }) => {
  const [token, setToken] = useState('')
  const [isLoadingToken, setIsLoadingToken] = useState(true)
  const [tokenLoadError, setTokenLoadError] = useState('')

  const loadToken = useCallback(() => {
    const fetch = async () => {
      try {
        setIsLoadingToken(true)
        setTokenLoadError(null)
        const _token =
          await 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWJlZCI6Ijk0ZDAxYjAzLTY3MzAtNDM3Mi1hODM5LTJmOWUyOTM4MTYwYSIsInVzZXIiOnsiaWQiOiI2MTQzODZkYTY2NjU5MjAwMTJmYzg1N2YiLCJlbWFpbCI6InJsb25nQHNhcGVyYXRlY2guY29tIiwibmFtZSI6IlJvbmFsZCBMb25nIn0sIm9yZyI6e30sImlhdCI6MTY1ODg5NTg4MH0.kHh3NjPsqHP8N3_3GF56gLqKBShMNGcp6CJKtsQG0uQ' //await getFlatFileToken()
        setToken(_token)
      } catch (e) {
        console.error(e)
        setTokenLoadError(e)
      } finally {
        setIsLoadingToken(false)
      }
    }
    fetch()
  }, [])

  useEffect(() => {
    if (show) {
      loadToken()
    }
  }, [show])

  const handleClose = () => {
    setShow(false)
  }

  return (
    <div className='flex h-screen w-screen' style={{ height: '100vh' }}>
      {show ? (
        <div
          className='relative flex h-screen w-screen'
          style={{ height: '100vh' }}
        >
          {isLoadingToken ? (
            <div>{'Loading FlatFile...'}</div>
          ) : (
            <FlatFileImportReact token={token} onSuccess={onSuccess} />
          )}
          {tokenLoadError?.length > 0 ? (
            <div>{JSON.stringify(tokenLoadError)}</div>
          ) : null}
          <FlatFileWrapper
            className={`flatfile-sdk ${isLoadingToken ? 'hidden' : 'block'}`}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      ) : null}
    </div>
  )
}

const FlatFileWrapper = styled.div`
  .flatfile-close {
    position: absolute;
    right: 20px;
    top: 15px;
    width: 20px;
    height: 20px;
    background-color: transparent;
    border: none;
    box-shadow: none;
    cursor: pointer;
    z-index: 999999999;
  }

  .flatfile-close:after {
    display: inline-block;
    content: 'X';
    color: white;
  }

  iframe {
    width: 100%;
    height: 100%;
    border-width: 0;
    border-radius: 20px;
  }

  body.flatfile-active {
    overflow: hidden;
    overscroll-behavior-x: none;
  }
`

export default AddBulkContact

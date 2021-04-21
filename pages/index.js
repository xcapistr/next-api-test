import Head from 'next/head'
import { useState } from 'react'
import { connectToDatabase } from '../util/mongodb'
import axios from 'axios'

export default function Home({ isConnected }) {
  const [data, setData] = useState([])

  const getData = async () => {
    const result = await axios.get('/api')
    console.log(result)
    setData(result.data)
  }

  const addData = async () => {
    const result = await axios.post('/api', { test: new Date().toISOString() })
    console.log(result)
  }

  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <button onClick={getData}>GET DATA</button>
      <button onClick={addData}>ADD DATA</button>
      <ul>
        {data.map((d, i) => (
          <li key={i}>{d.test}</li>
        ))}
      </ul>
    </div>
  )
}

export async function getServerSideProps(context) {
  const { client } = await connectToDatabase()

  const isConnected = await client.isConnected()

  return {
    props: { isConnected }
  }
}

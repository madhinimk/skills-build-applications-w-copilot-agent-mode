import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { CollectionPage, DataTable } from './Activities.jsx'

export default function Users() {
  const [rows, setRows] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('users').then(setRows).catch((loadError) => setError(loadError.message)) }, [])
  return <CollectionPage title="Users" description="Your community, ready for its next goal." error={error}><DataTable columns={['Name', 'Email', 'Team']} rows={rows} fields={['name', 'email', 'team']} /></CollectionPage>
}
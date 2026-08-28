import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { CollectionPage, DataTable } from './Activities.jsx'

export default function Teams() {
  const [rows, setRows] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('/api/teams/').then(setRows).catch((loadError) => setError(loadError.message)) }, [])
  return <CollectionPage title="Teams" description="The groups making every session more social." error={error}><DataTable columns={['Name', 'Members', 'Points']} rows={rows} fields={['name', 'members', 'points']} /></CollectionPage>
}
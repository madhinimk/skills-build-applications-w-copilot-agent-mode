import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { CollectionPage, DataTable } from './Activities.jsx'

export default function Workouts() {
  const [rows, setRows] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('workouts').then(setRows).catch((loadError) => setError(loadError.message)) }, [])
  return <CollectionPage title="Workouts" description="Purposeful sessions for every level of ambition." error={error}><DataTable columns={['Name', 'Category', 'Difficulty', 'Duration']} rows={rows} fields={['name', 'category', 'difficulty', 'duration']} /></CollectionPage>
}
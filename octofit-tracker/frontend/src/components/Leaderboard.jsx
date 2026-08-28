import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'
import { CollectionPage, DataTable } from './Activities.jsx'

export default function Leaderboard() {
  const [rows, setRows] = useState([])
  const [error, setError] = useState('')
  useEffect(() => { fetchCollection('leaderboard').then(setRows).catch((loadError) => setError(loadError.message)) }, [])
  return <CollectionPage title="Leaderboard" description="A clear view of the current standings." error={error}><DataTable columns={['Rank', 'User', 'Team', 'Points']} rows={rows} fields={['rank', 'user', 'team', 'points']} /></CollectionPage>
}
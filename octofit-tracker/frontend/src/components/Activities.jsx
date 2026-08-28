import { useEffect, useState } from 'react'
import { fetchCollection } from '../api.js'

function Activities() {
  const [activities, setActivities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchCollection('activities').then(setActivities).catch((loadError) => setError(loadError.message))
  }, [])

  return <CollectionPage title="Activities" description="Recent movement across your OctoFit community." error={error}>
    <DataTable columns={['User', 'Type', 'Duration', 'Date']} rows={activities} fields={['user', 'type', 'duration', 'date']} />
  </CollectionPage>
}

export function CollectionPage({ title, description, error, children }) {
  return <section><div className="page-heading"><p className="eyebrow">TRACKER / {title.toUpperCase()}</p><h1>{title}</h1><p className="lead text-secondary">{description}</p></div>{error ? <div className="alert alert-danger">{error}</div> : children}</section>
}

export function DataTable({ columns, rows, fields }) {
  if (!rows.length) return <div className="empty-state">No records yet.</div>
  return <div className="table-responsive"><table className="table align-middle"><thead><tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={row._id || row.id || index}>{fields.map((field) => <td key={field}>{String(row[field] ?? '-')}</td>)}</tr>)}</tbody></table></div>
}

export default Activities
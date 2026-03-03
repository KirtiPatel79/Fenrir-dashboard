type Status = 'Completed' | 'Scheduled' | 'Failed'

const styles: Record<Status, string> = {
  Completed: 'bg-green-500/80 text-white',
  Scheduled: 'bg-neutral-500/80 dark:bg-neutral-600 text-white',
  Failed: 'bg-red-500/90 text-white',
}

export default function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-medium ${styles[status]}`}>
      {status}
    </span>
  )
}

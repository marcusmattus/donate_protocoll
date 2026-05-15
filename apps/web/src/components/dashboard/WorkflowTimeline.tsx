'use client'

interface WorkflowTimelineProps {
  workflows: Array<{
    id: string
    name: string
    type: string
    status: 'completed' | 'active' | 'pending' | 'failed'
    timestamp: Date
    details?: string
  }>
}

export function WorkflowTimeline({ workflows }: WorkflowTimelineProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )
      case 'active':
        return (
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-blue-600 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          </div>
        )
      case 'pending':
        return (
          <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        )
      case 'failed':
        return (
          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        )
      default:
        return (
          <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-slate-300 rounded-full" />
          </div>
        )
    }
  }

  return (
    <div className="glass-card rounded-3xl p-6">
      <h3 className="text-lg font-bold text-slate-900 mb-6">Workflow Activity</h3>

      {workflows.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <p className="text-slate-500 font-medium">No workflows yet</p>
          <p className="text-slate-400 text-sm mt-1">Workflows will appear when agents execute trades</p>
        </div>
      ) : (
        <div className="space-y-4 max-h-[400px] overflow-y-auto">
          {workflows.map((workflow, index) => (
            <div key={workflow.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                {getStatusIcon(workflow.status)}
                {index < workflows.length - 1 && (
                  <div className="w-0.5 h-full bg-slate-200 mt-2" />
                )}
              </div>
              <div className="flex-1 pb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-900">{workflow.name}</span>
                  <span className="text-xs text-slate-400">
                    {new Date(workflow.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                  {workflow.type}
                </span>
                {workflow.details && (
                  <p className="text-sm text-slate-500 mt-2">{workflow.details}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

import { DataTable } from '@/components/custom/data-table'
import { useDataTable } from '@/components/custom/data-table/hooks/use-data-table'
import { DataTablePagination } from '@/components/custom/data-table/components/DataTablePagination'
import { DataTableToolbar } from '@/components/custom/data-table/components/DataTableToolbar'
import { useTaskContext } from '@/features/task/data/context'
import DttbBulkActions from '@/features/task/components/dttb-bulk-action'
import { DttbColumn } from '@/features/task/components/dttb-columns'
import { priorities, statuses } from '@/features/task/data/constants'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import type { Task } from '@/features/task/data/type'
import ButtonImport from '@/components/custom/button-import'
import TaskSheet from '@/features/task/components/TaskSheet'
import ConfirmDialog from '@/components/custom/confirm-dialog'
import { exportToXLSX, importXLSX } from '@/utils/import-export'
import ButtonExport from '@/components/custom/button-export'

const DataTablePage = () => {
  const {
    tasks,
    handleImportTask,
    handleDeleteTask,
    handleDeleteSelectTask,
    setOpen,
    open,
    setCurrentData,
    currentData,
  } = useTaskContext()

  const { table } = useDataTable({
    data: tasks,
    columns: DttbColumn,
  })

  return (
    <div className="space-y-5 max-w-7xl mx-auto p-4">
      {/* top */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Tasks</h2>
          <p className="text-muted-foreground">
            Here's a list of your tasks for this month!
          </p>
        </div>
        <div className="flex gap-2">
          <ButtonExport
            handleExport={() => {
              exportToXLSX({
                rows: table.getFilteredRowModel().rows.map((r) => r.original),
              })
            }}
          />
          <ButtonImport
            handleImport={async (file) => {
              const dataImport = (await importXLSX(file)) as Task[]
              handleImportTask(dataImport)
            }}
          />
          <Button className="space-x-1" onClick={() => setOpen('create')}>
            <span>Create</span> <Plus size={18} />
          </Button>
        </div>
      </div>

      {/* toolbar */}
      <DataTableToolbar
        table={table}
        filters={[
          { columnId: 'status', title: 'Status', options: statuses },
          {
            columnId: 'priority',
            title: 'Priority',
            options: priorities,
          },
        ]}
      />
      {/* table */}
      <DataTable table={table} />
      {/* pagination */}
      <DataTablePagination table={table} />
      {/* bulk actions */}
      <DttbBulkActions table={table} />
      {/* dialog */}
      <TaskSheet
        open={open === 'create' || open === 'update'}
        onOpenChange={() => {
          setOpen(false)
          setCurrentData(null)
        }}
      />
      <ConfirmDialog
        open={open === 'delete' || open === 'deleteSelect'}
        onOpenChange={() => {
          setOpen(false)
          setCurrentData(null)
        }}
        confirmText="Delete"
        confirmVariant="destructive"
        handleConfirm={async () => {
          if (open === 'delete' && currentData) {
            handleDeleteTask(currentData)
          } else if (open === 'deleteSelect') {
            handleDeleteSelectTask(
              table.getFilteredSelectedRowModel().rows.map((r) => r.original),
            )
          }
          table.resetRowSelection()
        }}
      />
    </div>
  )
}

export default DataTablePage

// src/components/DataTable.tsx

// A generic "column" definition
interface ColumnDef {
  header: string;
  accessorKey: string; // The key from your data object
}

// A generic "row" is just an object with any keys
type TableRow = Record<string, any>;

interface DataTableProps {
  title: string;
  columns: ColumnDef[];
  data: TableRow[];
}

const DataTable = ({ title, columns, data }: DataTableProps) => {
  // Function to render cell content
  const renderCellContent = (cellData: any) => {
    // Check if it's a URL object with href and text properties
    if (cellData && typeof cellData === 'object' && cellData.href && cellData.text) {
      return (
        <a 
          href={cellData.href} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline break-all"
        >
          {cellData.text}
        </a>
      );
    }
    
    // Return regular data for everything else
    return cellData;
  };

  return (
    <div className="overflow-x-auto">
      {/* The title is now optional and will only render if provided */}
      {title && <h3 className="text-2xl font-bold text-neutral-800 mb-6">{title}</h3>}
      <div className="border border-neutral-200 rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-neutral-200">
          <thead className="bg-neutral-100">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.accessorKey}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-bold text-neutral-600 uppercase tracking-wider"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-neutral-200">
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="even:bg-neutral-50 hover:bg-red-50 transition-colors">
                {columns.map((column) => (
                  <td
                    key={column.accessorKey}
                    className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700"
                  >
                    {/* Use the render function to handle URL objects */}
                    {renderCellContent(row[column.accessorKey])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
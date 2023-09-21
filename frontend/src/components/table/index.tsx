import Row from "./row";
import { RowState } from "./types";

import "./index.css";

interface TableProps {
  columnNames: string[];
  rows: RowState[];
  onDeleteRow: (id: string) => void;
}

function Table(props: TableProps) {
  const { rows, columnNames, onDeleteRow } = props;
  return (
    <table>
      <thead>
        <tr>
          {columnNames.map((column, idx) => (
            <th key={idx}>{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <Row
            key={row.id}
            rowState={row}
            onDelete={() => onDeleteRow(row.id)}
          />
        ))}
      </tbody>
    </table>
  );
}

export default Table;

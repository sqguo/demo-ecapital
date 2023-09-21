import Row from "./row";
import { RowState } from "./types";

import "./index.css";

interface TableProps {
  columnNames: string[];
  rows: RowState[];
}

function Table(props: TableProps) {
  const { rows, columnNames } = props;
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
          <Row key={row.id} rowState={row} />
        ))}
      </tbody>
    </table>
  );
}

export default Table;

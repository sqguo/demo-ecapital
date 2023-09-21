import _ from "lodash";
import { RowState } from "./types";
import Cell from "./cell";

interface RowProps {
  rowState: RowState;
}

function Row(props: RowProps) {
  const { rowState } = props;
  return (
    <tr>
      {rowState.cells.map((cellState) => (
        <Cell key={rowState.id} state={cellState} />
      ))}
    </tr>
  );
}

export default Row;

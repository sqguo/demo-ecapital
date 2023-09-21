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
      {rowState.cells.map((cellState, idx) => (
        <Cell key={rowState.id + idx} state={cellState} />
      ))}
    </tr>
  );
}

export default Row;

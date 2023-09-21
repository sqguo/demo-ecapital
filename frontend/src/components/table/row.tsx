import _ from "lodash";
import { RowState } from "./types";
import Cell from "./cell";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface RowProps {
  rowState: RowState;
  onDelete: () => void;
}

function Row(props: RowProps) {
  const { rowState, onDelete } = props;
  return (
    <tr>
      {rowState.cells.map((cellState, idx) => (
        <Cell key={rowState.id + idx} state={cellState} />
      ))}
      <td>
        <IconButton onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </td>
    </tr>
  );
}

export default Row;

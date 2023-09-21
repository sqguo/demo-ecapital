import { CellState } from "./types";
import { TextField } from "@mui/material";
import { useState } from "react";

interface CellProps {
  state: CellState;
}

function Cell(props: CellProps) {
  const { state } = props;
  const [value, setValue] = useState(state.value);
  return (
    <td data-valid={true} data-cell-state={state.state}>
      <TextField
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setValue(event.target.value);
        }}
        onBlur={() => state.onChange && state.onChange(value)}
      />
    </td>
  );
}

export default Cell;

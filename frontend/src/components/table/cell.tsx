import { CellState, CellValueType } from "./types";
import { TextField } from "@mui/material";
import { useState } from "react";
import { NumericFormat } from "react-number-format";

interface CellProps {
  state: CellState;
}

function Cell(props: CellProps) {
  const { state } = props;
  const [value, setValue] = useState(state.value);
  return (
    <td data-valid={true} data-cell-state={state.state}>
      {state.type === CellValueType.Numeric ? (
        <NumericFormat
          prefix="$"
          thousandSeparator
          decimalScale={2}
          value={value}
          customInput={TextField}
          onValueChange={(values) => {
            setValue(values.floatValue);
          }}
          onBlur={() => state.onChange && state.onChange(Number(value))}
        />
      ) : (
        <TextField
          value={value}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setValue(event.target.value);
          }}
          onBlur={() => state.onChange && state.onChange(value)}
        />
      )}
    </td>
  );
}

export default Cell;

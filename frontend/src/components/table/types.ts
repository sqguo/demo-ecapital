export enum CellValueState {
  Modified = "modified",
  Added = "added",
  Deleted = "deleted",
  Unchanged = "unchanged",
}

export enum CellValueType {
  Numeric = "numeric",
  Text = "text",
}

export type CellValue = string | number | null | undefined;

export interface CellState {
  state: CellValueState;
  value: CellValue;
  type: CellValueType;
  valueFormatter?: () => string;
  onChange?: (value: any) => void;
}

export interface RowState {
  id: string;
  cells: CellState[];
}

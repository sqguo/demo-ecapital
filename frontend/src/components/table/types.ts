export enum CellValueState {
  Modified = "modified",
  Added = "added",
  Deleted = "deleted",
  Unchanged = "unchanged",
}

export type CellValueType = string | number | null | undefined;

export interface CellState {
  state: CellValueState;
  value: CellValueType;
  valueFormatter?: () => string;
  onChange?: (value: any) => void;
}

export interface RowState {
  id: string;
  cells: CellState[];
}

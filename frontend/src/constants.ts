import { CellValueType } from "./components/table/types";
import { EmployeeTableColumn } from "./type";

export const EmployeeTableColumnNames = {
  [EmployeeTableColumn.FirstName]: "First Name",
  [EmployeeTableColumn.LastName]: "Last Name",
  [EmployeeTableColumn.Salary]: "Salary",
};

export const EmployeeTableColumnTypes = {
  [EmployeeTableColumn.FirstName]: CellValueType.Text,
  [EmployeeTableColumn.LastName]: CellValueType.Text,
  [EmployeeTableColumn.Salary]: CellValueType.Numeric,
};

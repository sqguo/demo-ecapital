import React, { useMemo, useState } from "react";
import _ from "lodash";
import "./App.css";
import useEmployee from "./hooks/useEmployee";
import { CellValueState } from "./components/table/types";
import { Table } from "./components";
import { Employee, EmployeeTableColumn } from "./type";
import "./EmployeeTable.css";
import { EmployeeTableColumnNames } from "./constants";
import { IconButton, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { v4 as uuidv4 } from "uuid";

function EmployeeTable() {
  // states to track pending changes to the table
  const [rowsToUpdate, setRowsToUpdate] = useState<
    Record<string, Partial<Employee>>
  >({});
  const [rowsToDelete, setRowsToDelete] = useState<Set<string>>(new Set());
  const [rowsToCreate, setRowsToCreate] = useState<
    Record<string, Partial<Employee> & { id: string; createdAt: Date }>
  >({});

  // actual employee data from database
  const {
    employees = [],
    idToEmployeeMap,
    error,
    isLoading,
    handleUpdateEmployees,
    handleCreateEmployees,
    handleDeleteEmployees,
  } = useEmployee();

  console.log("rowsToUpdate", rowsToUpdate);
  console.log("rowsToCreate", rowsToCreate);

  // crunch the data to add metadata for display
  const tableRows = useMemo(() => {
    const employeesWithUpdates: (Employee & { createdAt: Date })[] =
      employees.map((employee) => ({
        ...employee,
        ...rowsToUpdate[employee.id],
        createdAt: new Date(employee.createdAt),
      }));

    const allEmployees =
      Object.values(rowsToCreate).concat(employeesWithUpdates);

    return allEmployees.map((employee) => ({
      id: employee.id,
      cells: Object.values(EmployeeTableColumn).map((columnKey) => {
        const [state, value, onChange] = (() => {
          if (rowsToCreate[employee.id]) {
            const currentAttrs = rowsToCreate[employee.id];
            return [
              CellValueState.Added,
              currentAttrs[columnKey],
              (value: any) => {
                setRowsToCreate((rows) => ({
                  ...rows,
                  [employee.id]: { ...currentAttrs, [columnKey]: value },
                }));
              },
            ];
          }
          if (rowsToDelete.has(employee.id)) {
            return [
              CellValueState.Deleted,
              idToEmployeeMap[employee.id][columnKey],
            ];
          }
          if (!_.isNil(rowsToUpdate[employee.id]?.[columnKey])) {
            const currentUpdates = rowsToUpdate[employee.id];
            return [
              CellValueState.Modified,
              rowsToUpdate[employee.id][columnKey],
              (value: any) => {
                setRowsToUpdate((rows) => {
                  const isChanging =
                    idToEmployeeMap[employee.id][columnKey] !== value;
                  return {
                    ...rows,
                    [employee.id]: isChanging
                      ? { ...currentUpdates, [columnKey]: value }
                      : { ..._.omit(currentUpdates, [columnKey]) },
                  };
                });
              },
            ];
          }
          return [
            CellValueState.Unchanged,
            idToEmployeeMap[employee.id][columnKey],
            (value: any) => {
              if (value === idToEmployeeMap[employee.id][columnKey]) return;
              setRowsToUpdate((rows) => ({
                ...rows,
                [employee.id]: { [columnKey]: value },
              }));
            },
          ];
        })();
        return {
          state,
          value,
          onChange,
        };
      }),
    }));
  }, [idToEmployeeMap, employees, rowsToUpdate, rowsToDelete, rowsToCreate]);

  if (error) return <div>Something went wrong.</div>;
  if (isLoading) return <div>loading...</div>;

  const onCreateRow = () => {
    const placeholderId = uuidv4();
    setRowsToCreate((rows) => ({
      ...rows,
      [placeholderId]: {
        id: placeholderId,
        createdAt: new Date(),
      },
    }));
  };

  return (
    <div className="employee-table">
      <div className="employee-table-controls">
        <Button className="cancel-changes-button">Cancel</Button>
        <Button className="save-changes-button">Save</Button>
        <IconButton className="add-employee-button" onClick={onCreateRow}>
          <AddIcon />
        </IconButton>
      </div>
      <Table
        columnNames={Object.values(EmployeeTableColumn).map(
          (key) => EmployeeTableColumnNames[key]
        )}
        rows={tableRows}
      />
    </div>
  );
}

export default EmployeeTable;

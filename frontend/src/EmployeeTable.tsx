import React, { useMemo, useState } from "react";
import _, { isNumber } from "lodash";
import "./App.css";
import useEmployee from "./hooks/useEmployee";
import { CellValueState } from "./components/table/types";
import { Table } from "./components";
import { Employee, EmployeeTableColumn } from "./type";
import "./EmployeeTable.css";
import {
  EmployeeTableColumnNames,
  EmployeeTableColumnTypes,
} from "./constants";
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

  const [tableKey, setTableKey] = useState(uuidv4());

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
    const sortedAllEmployees = _.sortBy(allEmployees, [
      (row) => new Date(row.createdAt),
    ]);

    return sortedAllEmployees.map((employee) => ({
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
          type: EmployeeTableColumnTypes[columnKey],
        };
      }),
    }));
  }, [idToEmployeeMap, employees, rowsToUpdate, rowsToDelete, rowsToCreate]);

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

  const onDeleteRow = (id: string) => {
    setRowsToDelete((rows) => {
      const toDelete = new Set(rows);
      toDelete.add(id);
      return toDelete;
    });
  };

  const onResetChanges = () => {
    setRowsToCreate({});
    setRowsToDelete(new Set());
    setRowsToUpdate({});
    setTableKey(uuidv4());
  };

  const isChangesValid = useMemo(() => {
    return (
      Object.values(rowsToCreate).every(
        (row) =>
          row.firstName?.trim() && row.lastName?.trim() && isNumber(row.salary)
      ) &&
      Object.values(rowsToUpdate).every((row) =>
        Object.values(row).every((change) =>
          typeof change === "string" ? Boolean(change?.trim()) : Boolean(change)
        )
      )
    );
  }, [rowsToUpdate, rowsToCreate]);

  const hasChanges = useMemo(() => {
    return (
      Object.keys(rowsToUpdate).length > 0 ||
      Object.keys(rowsToCreate).length > 0 ||
      rowsToDelete.size > 0
    );
  }, [rowsToUpdate, rowsToCreate, rowsToDelete]);

  const onSaveChanges = async () => {
    await Promise.all([
      handleUpdateEmployees(
        Object.keys(rowsToUpdate).map((key) => ({
          ...rowsToUpdate[key],
          id: key,
        }))
      ),
      handleDeleteEmployees(Array.from(rowsToDelete)),
      handleCreateEmployees(
        Object.keys(rowsToCreate).map((key) => ({
          ...rowsToCreate[key],
        })) as any
      ),
    ]);
    onResetChanges();
  };

  if (error) return <div>Something went wrong.</div>;
  if (isLoading) return <div>loading...</div>;

  console.log("isChangesValid", isChangesValid, hasChanges);

  return (
    <div className="employee-table">
      <div className="employee-table-controls">
        <Button
          className="cancel-changes-button"
          color="secondary"
          variant="outlined"
          disabled={!hasChanges}
          onClick={onResetChanges}
        >
          Cancel
        </Button>
        <Button
          className="save-changes-button"
          color="primary"
          variant="outlined"
          disabled={!isChangesValid || !hasChanges}
          onClick={onSaveChanges}
        >
          Save
        </Button>
        <IconButton className="add-employee-button" onClick={onCreateRow}>
          <AddIcon />
        </IconButton>
      </div>
      <Table
        key={tableKey} // TODO: use imperative handler to handle state refresh
        columnNames={Object.values(EmployeeTableColumn).map(
          (key) => EmployeeTableColumnNames[key]
        )}
        rows={tableRows}
        onDeleteRow={onDeleteRow}
      />
    </div>
  );
}

export default EmployeeTable;

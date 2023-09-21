import useSWR from "swr";
import API from "../api/constants";
import EmployeeService from "../api/employee";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { useMemo } from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function useEmployee() {
  const { data, error, isLoading, mutate } = useSWR<{ employees: Employee[] }>(
    API.EMPLOYEE,
    fetcher
  );
  const employees = useMemo(() => data?.employees ?? [], [data]);
  const idToEmployeeMap = useMemo(() => _.keyBy(employees, "id"), [employees]);

  const handleUpdateEmployees = async (
    updates: (Partial<Employee> & { id: string })[]
  ) => {
    const idToUpdateMap = _.keyBy(updates, "id");
    try {
      await mutate(EmployeeService.bulkUpdateEmployee(updates), {
        rollbackOnError: true,
        revalidate: true,
        optimisticData: (data) => {
          const updatedEmployees = (data?.employees ?? []).map((employee) =>
            idToUpdateMap[employee.id]
              ? {
                  ...employee,
                  ...idToUpdateMap[employee.id],
                }
              : employee
          );
          return { employees: updatedEmployees };
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteEmployees = async (ids: string[]) => {
    const idsToDelete = new Set(ids);
    try {
      await mutate(EmployeeService.bulkDeleteEmployee(ids), {
        rollbackOnError: true,
        revalidate: true,
        optimisticData: (data) => {
          const updatedEmployees = (data?.employees ?? []).map((employee) =>
            idsToDelete.has(employee.id) ? employee : null
          );
          return { employees: _.compact(updatedEmployees) };
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleCreateEmployees = async (
    attributes: Pick<Employee, "firstName" | "lastName" | "salary">[]
  ) => {
    try {
      const now = new Date();
      await mutate(EmployeeService.bulkCreateEmployee(attributes), {
        rollbackOnError: true,
        revalidate: true,
        optimisticData: (data) => {
          const newEmployees: Employee[] = attributes.map((attr) => ({
            ...attr,
            id: uuidv4(),
            createdAt: now,
            updatedAt: now,
            deletedAt: null,
          }));
          const updatedEmployees = newEmployees.concat(data?.employees ?? []);
          return { employees: updatedEmployees };
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  return {
    employees,
    idToEmployeeMap,
    error,
    isLoading,
    handleCreateEmployees,
    handleUpdateEmployees,
    handleDeleteEmployees,
  };
}

export default useEmployee;

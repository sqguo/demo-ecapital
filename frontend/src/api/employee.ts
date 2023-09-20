import axios from "axios";
import API from "./constants";

const api = axios.create();

async function fetchEmployees(): Promise<Employee[]> {
  try {
    const { data } = await api.get(API.EMPLOYEE);
    const { employees } = data ?? {};
    return employees ?? [];
  } catch (e) {
    console.log(e);
    throw e;
  }
}

async function updateEmployee(
  id: string,
  updates: Partial<Employee>
): Promise<Employee | null> {
  try {
    const { data } = await api.put(`${API.EMPLOYEE}/${id}`, { updates });
    const { employee } = data ?? {};
    return employee;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

async function bulkUpdateEmployee(
  updates: (Partial<Employee> & { id: string })[]
): Promise<Employee[]> {
  try {
    const { data } = await api.put(`${API.EMPLOYEE}/`, { updates });
    const { employee } = data ?? {};
    return employee;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

async function createEmployee(
  attributes: Partial<Employee>
): Promise<Employee | null> {
  try {
    const { data } = await api.post(`${API.EMPLOYEE}`, { attributes });
    const { employee } = data ?? {};
    return employee;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

async function bulkCreateEmployee(
  attributes: Partial<Employee>[]
): Promise<Employee[]> {
  try {
    const { data } = await api.post(`${API.EMPLOYEE}/bulk`, { attributes });
    const { employees } = data ?? {};
    return employees ?? [];
  } catch (e) {
    console.log(e);
    throw e;
  }
}

async function deleteEmployee(id: string) {
  try {
    await api.delete(`${API.EMPLOYEE}/${id}`);
  } catch (e) {
    console.log(e);
    throw e;
  }
}

async function bulkDeleteEmployee(ids: string[]) {
  try {
    await api.delete(`${API.EMPLOYEE}/`, { data: { ids } });
  } catch (e) {
    console.log(e);
    throw e;
  }
}

const EmployeeService = {
  fetchEmployees,
  updateEmployee,
  bulkUpdateEmployee,
  createEmployee,
  bulkCreateEmployee,
  deleteEmployee,
  bulkDeleteEmployee,
};

export default EmployeeService;

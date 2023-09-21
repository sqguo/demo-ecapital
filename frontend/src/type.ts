export interface Employee {
  // TODO: branded type for UUID
  id: string;
  firstName: string;
  lastName: string;
  salary: number;
  // TODO: auto convert string to Date in axios interceptor
  createdAt: Date | string;
  updatedAt: Date | string;
  deletedAt: Date | string | null;
}

export enum EmployeeTableColumn {
  FirstName = "firstName",
  LastName = "lastName",
  Salary = "salary",
}

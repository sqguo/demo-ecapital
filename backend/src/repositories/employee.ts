import { Employee } from "@lib/models";
import { EmployeeModel } from "@lib/models/employee";
import { Attributes, CreationAttributes, Op } from "sequelize";

/**
 * Fetches the employee matching the given ID.
 * @param id the UUID of the employee
 * @returns a plain employee object
 */
async function getEmployee(id: string) {
  try {
    const employee = await Employee.findOne({ where: { id } });
    return employee?.get({ plain: true });
  } catch (e) {
    console.log(e);
    throw e;
  }
}

/**
 * Fetches all existing employees with pagination, ordered by creation date.
 * @param limit the max number of rows to retrieve
 * @param offset the number of rows to offset
 * @returns rows of plain employee objects, and the total number of rows available
 */
async function getEmployees(limit: number, offset: number) {
  try {
    const { rows, count } = await Employee.findAndCountAll({
      where: { deletedAt: { [Op.eq]: null } },
      order: [["createdAt", "ASC"]],
      limit,
      offset,
    });
    return {
      rows: rows.map((row) => row.get({ plain: true })),
      count,
    };
  } catch (e) {
    console.log(e);
    throw e;
  }
}

/**
 * Create a new employee.
 * @param attributes the attributes to create with
 * @returns a plain object for the created employee
 */
async function createEmployee(attributes: CreationAttributes<EmployeeModel>) {
  try {
    const employee = await Employee.create(attributes);
    return employee.get({ plain: true });
  } catch (e) {
    console.log(e);
    throw e;
  }
}

/**
 * Bulk creates new employees.
 * @param attributes a list of attributes to create with
 * @returns plain objecst for the created employees
 */
async function bulkCreateEmployees(
  attributes: CreationAttributes<EmployeeModel>[]
) {
  try {
    const employees = await Employee.bulkCreate(attributes);
    return employees.map((employee) => employee.get({ plain: true }));
  } catch (e) {
    console.log(e);
    throw e;
  }
}

/**
 * Updates the employee matching the given ID.
 * @param id the UUID of the employee
 * @param updates the attributes to update
 * @returns a plain object for the updated employee
 */
async function updateEmployee(
  id: string,
  updates: Omit<
    Partial<Attributes<EmployeeModel>>,
    "id" | "createdAt" | "updatedAt"
  >
) {
  try {
    const employee = await Employee.findOne({ where: { id } });
    if (!employee) throw new Error("Employee not found");
    await employee.update({ ...updates });
    return employee.get({ plain: true });
  } catch (e) {
    console.log(e);
    throw e;
  }
}

/**
 * Soft delete the employee matching the given ID.
 * @param id the UUID of the employee
 */
async function deleteEmployee(id: string) {
  try {
    await Employee.destroy({ where: { id } });
  } catch (e) {
    console.log(e);
    throw e;
  }
}

/**
 * Soft delete the employee matching the given IDs.
 * @param ids the UUIDs of the employees
 */
async function bulkDeleteEmployees(ids: string[]) {
  try {
    await Employee.destroy({ where: { id: { [Op.in]: ids } } });
  } catch (e) {
    console.log(e);
    throw e;
  }
}

const EmployeeRepo = {
  getEmployee,
  getEmployees,
  createEmployee,
  bulkCreateEmployees,
  updateEmployee,
  deleteEmployee,
  bulkDeleteEmployees,
};

export default EmployeeRepo;

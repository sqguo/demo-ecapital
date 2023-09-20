import { Employee } from "@lib/models";

async function getEmployee(id: string) {
  try {
    const employee = await Employee.findOne({ where: { id } });
    return employee?.get({ plain: true });
  } catch (e) {
    console.log(e);
    throw e;
  }
}

const EmployeeRepo = { getEmployee };

export default EmployeeRepo;

import { DEFAULT_EMPLOYEE_PAGE_LIMIT } from "@lib/constants";
import { EmployeeRepo } from "@lib/repositories";
import { Request, Response } from "express";
import _ from "lodash";

// TODO: setup swagger UI for API documentation
async function getEmployee(req: Request, res: Response) {
  try {
    // TODO: enforce API type contract
    const { employeeId } = req.params;
    if (!employeeId) {
      return res.status(400).send("Employee ID is required");
    }
    const employee = await EmployeeRepo.getEmployee(employeeId);
    return res.status(200).send({ employee });
  } catch (e) {
    console.log(e);
    return res.status(500).send();
  }
}

async function getEmployeesPaginated(req: Request, res: Response) {
  try {
    // TODO: enforce API type contract
    const limit = req.body.limit ?? DEFAULT_EMPLOYEE_PAGE_LIMIT;
    const offset = req.body.offset ?? 0;

    const { rows, count } = await EmployeeRepo.getEmployees(limit, offset);
    return res.status(200).send({ employees: rows, count });
  } catch (e) {
    console.log(e);
    return res.status(500).send();
  }
}

async function updateEmployee(req: Request, res: Response) {
  try {
    // TODO: enforce API type contract
    const { employeeId } = req.params;
    const updates = req.body.updates ?? {};
    if (!employeeId) {
      return res.status(400).send("Employee ID is required");
    }

    const updatedEmployee = await EmployeeRepo.updateEmployee(
      employeeId,
      _.pick(updates, ["firstName", "lastName", "salary"])
    );
    return res.status(200).send({ employee: updatedEmployee });
  } catch (e) {
    console.log(e);
    return res.status(500).send();
  }
}

async function createEmployee(req: Request, res: Response) {
  try {
    // TODO: enforce API type contract
    const attributes = req.body.attributes ?? {};
    const newEmployee = await EmployeeRepo.createEmployee(
      _.pick(attributes, ["firstName", "lastName", "salary"])
    );
    return res.status(200).send({ employee: newEmployee });
  } catch (e) {
    console.log(e);
    return res.status(500).send();
  }
}

async function bulkCreateEmployee(req: Request, res: Response) {
  try {
    // TODO: enforce API type contract
    const employeesToCreate = req.body.attributes ?? {};
    const newEmployee = await EmployeeRepo.createEmployee(
      employeesToCreate.map((toCreate: any) =>
        _.pick(toCreate, ["firstName", "lastName", "salary"])
      )
    );
    return res.status(200).send({ employee: newEmployee });
  } catch (e) {
    console.log(e);
    return res.status(500).send();
  }
}

async function deleteEmployee(req: Request, res: Response) {
  try {
    // TODO: enforce API type contract
    const { employeeId } = req.params;
    if (!employeeId) {
      return res.status(400).send("Employee ID is required");
    }
    await EmployeeRepo.deleteEmployee(employeeId);
    return res.status(200);
  } catch (e) {
    console.log(e);
    return res.status(500).send();
  }
}

const EmployeeController = {
  getEmployee,
  getEmployeesPaginated,
  createEmployee,
  bulkCreateEmployee,
  updateEmployee,
  deleteEmployee,
};

export default EmployeeController;

import { EmployeeRepo } from "@lib/repositories";
import { Request, Response } from "express";

const get = async (req: Request, res: Response) => {
  try {
    const employeeId = req.body.id;
    if (!employeeId) {
      return res.status(400).send("Employee ID is required");
    }
    const employee = await EmployeeRepo.getEmployee(employeeId);
    return res.status(200).send({ employee });
  } catch (e) {
    console.log(e);
    return res.status(500).send();
  }
};

const EmployeeController = {
  get,
};

export default EmployeeController;

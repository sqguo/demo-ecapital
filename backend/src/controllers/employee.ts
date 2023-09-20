import { Request, Response } from "express";

const get = async (req: Request, res: Response) => {
  try {
    res.status(200).send({ HELLO: "there" });
  } catch (e) {
    res.status(500).send();
  }
};

const EmployeeController = {
  get,
};

export default EmployeeController;

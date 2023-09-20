import {
  UUIDV4,
  DataTypes,
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "@lib/config/sequelize";

export interface EmployeeModel
  extends Model<
    InferAttributes<EmployeeModel>,
    InferCreationAttributes<EmployeeModel>
  > {
  id: CreationOptional<string>;
  firstName: string;
  lastName: string;
  salary: number;
  createdAt?: CreationOptional<Date>;
  updatedAt?: CreationOptional<Date>;
  deletedAt?: CreationOptional<Date> | null;
}

const employee = sequelize.define<EmployeeModel>(
  "Employee",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    salary: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    paranoid: true,
  }
);

export default employee;

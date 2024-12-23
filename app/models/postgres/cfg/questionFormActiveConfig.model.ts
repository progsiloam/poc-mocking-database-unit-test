import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { connectToPostgres } from '../..';

interface QuestionFormActiveConfigAttributes {
  id: number;
  major_id: number;
  version: number;
  total_question: number;
  created_on: Date;
  created_by: string;
  modified_on: Date;
  modified_by: string;
}

class QuestionFormActiveConfigModel
  extends Model<InferAttributes<QuestionFormActiveConfigModel>, InferCreationAttributes<QuestionFormActiveConfigModel>>
  implements QuestionFormActiveConfigAttributes
{
  declare id: CreationOptional<number>;
  declare major_id: number;
  declare version: number;
  declare total_question: number;
  declare created_on: Date;
  declare created_by: string;
  declare modified_on: Date;
  declare modified_by: string;
}

QuestionFormActiveConfigModel.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      autoIncrementIdentity: true,
      validate: {
        notEmpty: true,
      },
    },
    major_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    version: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    total_question: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    created_on: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    created_by: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    modified_on: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    modified_by: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    tableName: 'question_form_active_config',
    sequelize: connectToPostgres,
    timestamps: false,
    schema: 'cfg',
  },
);

export { QuestionFormActiveConfigAttributes, QuestionFormActiveConfigModel };

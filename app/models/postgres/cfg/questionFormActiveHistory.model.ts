import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { connectToPostgres } from '../..';

interface QuestionFormActiveHistoryAttributes {
  id: number;
  major_id: number;
  version_from?: number;
  version_to: number;
  total_question_from?: number;
  total_question_to: number;
  created_by: string;
  created_on: Date;
}

class QuestionFormActiveHistoryModel
  extends Model<InferAttributes<QuestionFormActiveHistoryModel>, InferCreationAttributes<QuestionFormActiveHistoryModel>>
  implements QuestionFormActiveHistoryAttributes
{
  declare id: CreationOptional<number>;
  declare major_id: number;
  declare version_from?: number;
  declare version_to: number;
  declare total_question_from?: number;
  declare total_question_to: number;
  declare created_by: string;
  declare created_on: Date;
}

QuestionFormActiveHistoryModel.init(
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
    version_from: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    version_to: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    total_question_from: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    total_question_to: {
      type: DataTypes.INTEGER,
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
    created_on: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    tableName: 'question_form_active_history',
    sequelize: connectToPostgres,
    timestamps: false,
    schema: 'cfg',
  },
);

export { QuestionFormActiveHistoryAttributes, QuestionFormActiveHistoryModel };

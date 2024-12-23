import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { connectToPostgres } from '../..';

interface SubmissionDetailAttributes {
  id: number;
  submission_header_id: number;
  major_id: number;
  name: string;
  mongo_submission_id: string;
  system_score: number;
  corrected_score?: number;
  weight_score?: number;
  created_by: string;
  created_on: Date;
  modified_by: string;
  modified_on: Date;
}

class SubmissionDetailModel
  extends Model<InferAttributes<SubmissionDetailModel>, InferCreationAttributes<SubmissionDetailModel>>
  implements SubmissionDetailAttributes
{
  declare id: CreationOptional<number>;
  declare submission_header_id: number;
  declare major_id: number;
  declare name: string;
  declare mongo_submission_id: string;
  declare system_score: number;
  declare corrected_score?: number;
  declare weight_score?: number;
  declare created_by: string;
  declare created_on: Date;
  declare modified_by: string;
  declare modified_on: Date;
}

SubmissionDetailModel.init(
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      autoIncrementIdentity: true,
      validate: {
        notEmpty: true,
      },
    },
    submission_header_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
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
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    mongo_submission_id: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    system_score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    corrected_score: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    weight_score: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
      defaultValue: DataTypes.NOW,
    },
    modified_by: {
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
      defaultValue: DataTypes.NOW,
    },
  },
  {
    schema: 'trx',
    tableName: 'submission_detail',
    sequelize: connectToPostgres,
    timestamps: false,
  },
);

export { SubmissionDetailAttributes, SubmissionDetailModel };

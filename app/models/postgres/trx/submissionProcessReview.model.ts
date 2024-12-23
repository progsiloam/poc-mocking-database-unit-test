import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { connectToPostgres } from '../..';

interface SubmissionProcessReviewAttributes {
  id: number;
  submission_header_id: number;
  username: string;
  group: number;
  score: number;
  note?: string;
  created_by: string;
  created_on: Date;
}

class SubmissionProcessReviewModel
  extends Model<InferAttributes<SubmissionProcessReviewModel>, InferCreationAttributes<SubmissionProcessReviewModel>>
  implements SubmissionProcessReviewAttributes
{
  declare id: CreationOptional<number>;
  declare submission_header_id: number;
  declare username: string;
  declare group: number;
  declare score: number;
  declare note?: string;
  declare created_by: string;
  declare created_on: Date;
}

SubmissionProcessReviewModel.init(
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
    submission_header_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    group: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    note: {
      type: DataTypes.STRING(255),
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
  },
  {
    schema: 'trx',
    tableName: 'submission_process_review',
    sequelize: connectToPostgres,
    timestamps: false,
  },
);

export { SubmissionProcessReviewAttributes, SubmissionProcessReviewModel };

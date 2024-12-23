import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import { connectToPostgres } from '../..';

interface SubmissionHeaderAttributes {
  id: number;
  submission_number: string;
  vendor_id: number;
  vendor_name: string;
  status: number;
  submitted_date?: Date;
  completed_date?: Date;
  expired_at?: Date;
  is_release: boolean;
  approved_by?: string;
  approved_on?: Date;
  score_collection?: number;
  score_review?: number;
  corrected_score_note?: string;
  note?: string;
  created_by: string;
  created_on: Date;
  modified_by: string;
  modified_on: Date;
}

class SubmissionHeaderModel
  extends Model<InferAttributes<SubmissionHeaderModel>, InferCreationAttributes<SubmissionHeaderModel>>
  implements SubmissionHeaderAttributes
{
  declare id: CreationOptional<number>;
  declare submission_number: string;
  declare vendor_id: number;
  declare vendor_name: string;
  declare status: number;
  declare submitted_date?: Date;
  declare completed_date?: Date;
  declare expired_at?: Date;
  declare is_release: boolean;
  declare approved_by?: string;
  declare approved_on?: Date;
  declare score_collection?: number;
  declare score_review?: number;
  declare corrected_score_note?: string;
  declare note?: string;
  declare created_by: string;
  declare created_on: Date;
  declare modified_by: string;
  declare modified_on: Date;
}

SubmissionHeaderModel.init(
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
    submission_number: {
      type: DataTypes.STRING(15),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    vendor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    vendor_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    submitted_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    completed_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    expired_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    is_release: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      defaultValue: false,
    },
    approved_by: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    approved_on: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    score_collection: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    score_review: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    corrected_score_note: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    note: {
      type: DataTypes.STRING(100),
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
    tableName: 'submission_header',
    sequelize: connectToPostgres,
    timestamps: false,
  },
);

export { SubmissionHeaderAttributes, SubmissionHeaderModel };

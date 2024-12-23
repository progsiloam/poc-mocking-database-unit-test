import { Result } from '@siloamhospitals/erp-template-expressjs-library';
import { VobService } from '../../app/services/vob.service';
import { MajorOfBusinessOptionsResponse, UserDetailResponse, VendorDetailResponse } from '../../app/types/vob.type.';

export class MockVobService extends VobService {
  public async getMajorOfBusinessOptions(): Promise<Result<MajorOfBusinessOptionsResponse[]>> {
    return Result.success([
      {
        value: 1,
        label: 'CONSTRUCTION',
      },
      {
        value: 2,
        label: 'CORPORATE SERVICES',
      },
      {
        value: 3,
        label: 'FACILITY MAINTENANCE & SERVICES',
      },
      {
        value: 4,
        label: 'GENERAL SUPPLIES & EQUIPMENT',
      },
      {
        value: 5,
        label: 'INFORMATION & COMMUNICATION TECHNOLOGY',
      },
      {
        value: 6,
        label: 'MARKETING',
      },
      {
        value: 35,
        label: 'GENERAL EQUIPMENT',
      },
      {
        value: 36,
        label: 'GENERAL SUPPLIES',
      },
      {
        value: 37,
        label: 'ICT',
      },
      {
        value: 38,
        label: 'UTILITIES',
      },
    ]);
  }

  public async getVendorById(vendorId: number): Promise<Result<VendorDetailResponse>> {
    const vendors = [
      {
        id: 1,
        email: 'vendor1@example.com',
        company_name: 'Company One',
        party_number: 'PN001',
        created_by: 'admin',
        created_on: new Date('2024-01-01'),
      },
      {
        id: 2,
        email: 'vendor2@example.com',
        company_name: 'Company Two',
        party_number: 'PN002',
        created_by: 'admin',
        created_on: new Date('2024-01-02'),
      },
      {
        id: 3,
        email: 'vendor3@example.com',
        company_name: 'Company Three',
        party_number: 'PN003',
        created_by: 'admin',
        created_on: new Date('2024-01-03'),
      },
      {
        id: 4,
        email: 'vendor4@example.com',
        company_name: 'Company Four',
        party_number: 'PN004',
        created_by: 'admin',
        created_on: new Date('2024-01-04'),
      },
      {
        id: 5,
        email: 'vendor5@example.com',
        company_name: 'Company Five',
        party_number: 'PN005',
        created_by: 'admin',
        created_on: new Date('2024-01-05'),
      },
      {
        id: 6,
        email: 'vendor6@example.com',
        company_name: 'Company Six',
        party_number: 'PN006',
        created_by: 'admin',
        created_on: new Date('2024-01-06'),
      },
      {
        id: 7,
        email: 'vendor7@example.com',
        company_name: 'Company Seven',
        party_number: 'PN007',
        created_by: 'admin',
        created_on: new Date('2024-01-07'),
      },
      {
        id: 8,
        email: 'vendor8@example.com',
        company_name: 'Company Eight',
        party_number: 'PN008',
        created_by: 'admin',
        created_on: new Date('2024-01-08'),
      },
      {
        id: 9,
        email: 'vendor9@example.com',
        company_name: 'Company Nine',
        party_number: 'PN009',
        created_by: 'admin',
        created_on: new Date('2024-01-09'),
      },
      {
        id: 10,
        email: 'vendor10@example.com',
        company_name: 'Company Ten',
        party_number: 'PN010',
        created_by: 'admin',
        created_on: new Date('2024-01-10'),
      },
    ];
    const vendor = vendors.find((a) => a.id == vendorId);
    return Result.success(vendor!);
  }

  public async getUserByUsername(username: string): Promise<Result<UserDetailResponse>> {
    return Result.success({
      username,
      email: `${username}@adiconsulting.co`,
    });
  }

  public async getUserWithRoleVendorManagement(): Promise<Result<string[]>> {
    return Result.success(['VENDOR MANAGEMENT 0001', 'VENDOR MANAGEMENT 0002']);
  }
}

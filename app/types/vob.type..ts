export interface MajorOfBusinessOptionsResponse {
  value: number;
  label: string;
}

export interface VendorDetailResponse {
  id: number;
  email: string;
  company_name: string;
  party_number: string;
  created_by: string;
  created_on: Date;
}

export interface UserDetailResponse {
  username: string;
  email: string;
}

export interface MajorOfBusiness {
  major_business_id: number;
  major_business_name: string;
}

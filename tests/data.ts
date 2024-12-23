import { Roles } from '../app/constants/roles.constant';
import { UserData } from '../app/types/auth.type';

export const req: { user: UserData } = {
  user: {
    username: 'maxime1',
    role_ids: [Roles.SiloamITProductSupport],
    dataareaid: null,
    email: null,
    vendor_id: undefined,
  },
};

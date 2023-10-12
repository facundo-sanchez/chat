import { Role, UserAccess, UserRole, Users } from 'src/models/index';

export const UsersRepository = [
  {
    provide: 'USERS_REPOSITORY',
    useValue: Users,
  },
  {
    provide: 'USERS_ACCESS_REPOSITORY',
    useValue: UserAccess,
  },
  {
    provide: 'ROLE_REPOSITORY',
    useValue: Role,
  },
  {
    provide: 'USERS_ROLE_REPOSITORY',
    useValue: UserRole,
  },
];

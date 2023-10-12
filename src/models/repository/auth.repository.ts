import { Users } from "../schemas/user.model";

export const AuthRepository = [
  {
    provide: 'AUTH_REPOSITORY',
    useValue: Users,
  },
];

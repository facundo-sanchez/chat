import { Chats, ChatMembers, ChatTypes, ChatRoles } from 'src/models/index';

export const ChatsRepository = [
  {
    provide: 'CHATS_REPOSITORY',
    useValue: Chats,
  },
  {
    provide: 'CHAT_MEMBERS_REPOSITORY',
    useValue: ChatMembers,
  },
  {
    provide: 'CHAT_TYPES_REPOSITORY',
    useValue: ChatTypes,
  },
  {
    provide: 'CHAT_ROLE_REPOSITORY',
    useValue: ChatRoles,
  },
];

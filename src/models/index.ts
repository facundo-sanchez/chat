import { Chats } from './schemas/chat.model';
import { Users } from './schemas/user.model';
import { ChatTypes } from './schemas/chatTypes.model';
import { UserAccess } from './schemas/userAccess.model';
import { Messages } from './schemas/message.model';
import { MessageTypes } from './schemas/messageTypes.model';
import { ChatRoles } from './schemas/chatRoles.model';
import { ChatMembers } from './schemas/chatMembers.model';
import { FeaturedMessages } from './schemas/featuredMessage.model';
import { Role } from './schemas/role.model';
import { UserRole } from './schemas/user-role.model';
// import { ChatMessages } from './schemas/chatMessages.model';
// import { UserMessages } from './schemas/userMessages.mode';

export const Models = [
  UserAccess,
  Chats,
  Users,
  ChatTypes,
  MessageTypes,
  Messages,
  // ChatMessages,
  // UserMessages,
  ChatRoles,
  ChatMembers,
  FeaturedMessages,
  Role,
  UserRole
];

export {
  UserAccess,
  Chats,
  Users,
  ChatTypes,
  MessageTypes,
  Messages,
  // ChatMessages,
  // UserMessages,
  ChatRoles,
  ChatMembers,
  FeaturedMessages,
  Role,
  UserRole
};

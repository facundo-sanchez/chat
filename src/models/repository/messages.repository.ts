import { FeaturedMessages, MessageTypes, Messages } from 'src/models/index';

export const MessagesRepository = [
  {
    provide: 'MESSAGE_REPOSITORY',
    useValue: Messages,
  },
  {
    provide: 'MESSAGE_TYPE_REPOSITORY',
    useValue: MessageTypes,
  },
  {
    provide: 'MESSAGE_FEATURED_REPOSITORY',
    useValue: FeaturedMessages,
  },
];

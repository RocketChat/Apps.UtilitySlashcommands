import { IHttp, IModify, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { IMessage } from '@rocket.chat/apps-engine/definition/messages';
import { IRoom } from '@rocket.chat/apps-engine/definition/rooms';
import { IUser } from '@rocket.chat/apps-engine/definition/users';

export interface IAccessors {
  modify: IModify;
  read: IRead;
  http: IHttp;
}

export interface IMessageWrapper {
  sender: IUser;
  receiver: IUser;
  room: IRoom;
  text: NonNullable<IMessage['text']>;
  // TODO add more if required
}

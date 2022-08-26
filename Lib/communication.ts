import { IMessage } from '@rocket.chat/apps-engine/definition/messages';
import { IAccessors, IMessageWrapper } from './types';

export async function notifyUser(params: IMessageWrapper & Pick<IAccessors, 'modify'>): Promise<void> {
  const { modify, room, sender, receiver, text } = params;
  return modify.getNotifier().notifyUser(receiver, {
    sender,
    room,
    text,
  });
}

export async function sendMessageToRoom(params: Pick<IAccessors, 'modify'> & Omit<IMessageWrapper, 'receiver'>): Promise<IMessage['id']> {
  const { modify, room, sender, text } = params;
  const creator = modify.getCreator();
  return creator.finish(creator.startMessage().setRoom(room).setSender(sender).setText(text));
}

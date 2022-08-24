import type { IRead, IModify } from '@rocket.chat/apps-engine/definition/accessors';
import type { IRoom } from '@rocket.chat/apps-engine/definition/rooms';
import type { IUser } from '@rocket.chat/apps-engine/definition/users';
import type { BlockBuilder } from '@rocket.chat/apps-engine/definition/uikit';

export async function sendNotification(read: IRead, modify: IModify, user: IUser, room: IRoom, message: string, blocks?: BlockBuilder): Promise<void> {
  const appUser = (await read.getUserReader().getAppUser()) as IUser;

  const msg = modify.getCreator().startMessage().setSender(appUser).setRoom(room).setText(message);

  if (blocks) {
    msg.setBlocks(blocks);
  }

  return read.getNotifier().notifyUser(user, msg.getMessage());
}

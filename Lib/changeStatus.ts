import type { IModify } from '@rocket.chat/apps-engine/definition/accessors';
import type { IUser, UserStatusConnection } from '@rocket.chat/apps-engine/definition/users';

export const changeStatus = async (modify: IModify, user: IUser, status: UserStatusConnection): Promise<void> => {
  await modify.getUpdater().getUserUpdater().updateStatus(user, '', status);
  return;
};

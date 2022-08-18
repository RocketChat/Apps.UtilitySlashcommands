import { IRoom } from '@rocket.chat/apps-engine/definition/rooms';
import { IUser } from '@rocket.chat/apps-engine/definition/users';
import { IAccessors } from '../../lib/types';

export async function addUsersToRoomByUsernames(
    params: Pick<IAccessors, 'modify'> & {
        user: IUser;
        room: IRoom;
        usernames: Array<IUser['username']>;
    },
): Promise<void> {
    const { modify, usernames, room, user } = params;
    const updater = modify.getUpdater();
    return updater.finish(
        (await updater.room(room.id, user)).setMembersToBeAddedByUsernames(
            usernames,
        ),
    );
}

import { IRead, IModify } from "@rocket.chat/apps-engine/definition/accessors";
import { IRoom } from "@rocket.chat/apps-engine/definition/rooms";
import { IUser } from "@rocket.chat/apps-engine/definition/users";

export async function notifyUser(
    read: IRead,
    modify: IModify,
    room: IRoom,
    message: string
): Promise<void> {
    return modify.getNotifier().notifyRoom(room, {
        sender: (await read.getUserReader().getAppUser()) as IUser,
        room,
        text: message,
    });
}

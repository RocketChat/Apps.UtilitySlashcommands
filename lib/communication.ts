import { IMessage } from '@rocket.chat/apps-engine/definition/messages';
import { IRoom } from '@rocket.chat/apps-engine/definition/rooms';
import { IUser } from '@rocket.chat/apps-engine/definition/users';
import { IAccessors } from './types';

interface ICommParams {
    sender: IUser;
    room: IRoom;
    receiver: IUser;
}

interface IMessageWithText {
    message?: IMessage;
    text?: string;
}

export async function sendMessage(
    params: Pick<IAccessors, 'modify'> &
        Omit<ICommParams, 'receiver'> & { message?: IMessage } & Partial<
            Pick<IMessage, 'text'>
        >,
): Promise<void> {
    const { modify, sender, message, text, room } = params;
    const creator = modify.getCreator();
    const id = await creator.finish(
        creator.startMessage({
            ...(message
                ? message
                : {
                      sender,
                      room,
                      text,
                  }),
        }),
    );
    if (!id) {
        throw new Error('failed to send message');
    }
}

export async function notifyUser(
    params: Pick<IAccessors, 'modify'> &
        ICommParams &
        Partial<Pick<IMessage, 'text'>> & { message?: IMessage },
): Promise<void> {
    const { modify, receiver, sender, room, message, text } = params;
    return modify.getNotifier().notifyUser(
        receiver,
        message
            ? message
            : {
                  sender,
                  room,
                  text,
              },
    );
}

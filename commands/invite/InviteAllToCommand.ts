import {
    IHttp,
    IModify,
    IPersistence,
    IRead,
} from '@rocket.chat/apps-engine/definition/accessors';
import {
    ISlashCommand,
    SlashCommandContext,
} from '@rocket.chat/apps-engine/definition/slashcommands';
import { notifyUser } from '../../lib/communication';
import { UtilitySlashcommandsApp } from '../../UtilitySlashcommandsApp';
import { addUsersToRoomByUsernames } from './lib';

export class InviteAllToCommand implements ISlashCommand {
    public command: string = 'invite-all-to';
    public i18nDescription: string = 'invite_all_to_description';
    public i18nParamsExample: string = 'invite_all_to_params';
    public providesPreview: boolean = false;

    constructor(private readonly app: UtilitySlashcommandsApp) {}

    public async executor(
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persis: IPersistence,
    ): Promise<void> {
        let [roomName] = context.getArguments();
        const sender = context.getSender();
        const room = context.getRoom();
        if (!roomName.startsWith('#')) {
            return notifyUser({
                modify,
                room,
                receiver: sender,
                sender: this.app.cat,
                text: 'invalid use of command',
            });
        }
        roomName = roomName.substring(1);
        const toRoom = await read.getRoomReader().getByName(roomName);
        if (!toRoom) {
            return notifyUser({
                modify,
                room,
                receiver: sender,
                sender: this.app.cat,
                text: `room \`#${toRoom}\` not found`,
            });
        }
        const members = await read.getRoomReader().getMembers(room.id);
        return addUsersToRoomByUsernames({
            modify,
            user: sender,
            room: toRoom,
            usernames: members.map((member) => member.username),
        });
    }
}

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

export class InviteAllFromCommand implements ISlashCommand {
    public command: string = 'invite-all-from';
    public i18nDescription: string = 'invite_all_from_description';
    public i18nParamsExample: string = 'invite_all_from_params';
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
        const fromRoom = await read.getRoomReader().getByName(roomName);
        if (!fromRoom) {
            return notifyUser({
                modify,
                room,
                receiver: sender,
                sender: this.app.cat,
                text: `room \`#${fromRoom}\` not found`,
            });
        }
        const members = await read.getRoomReader().getMembers(fromRoom.id);
        if (!members.some((member) => member.id === sender.id)) {
            // if executor is not a member, tell them the room doesn't exist
            return notifyUser({
                modify,
                room,
                receiver: sender,
                sender: this.app.cat,
                text: `room \`#${fromRoom}\` not found`,
            });
        }
        return addUsersToRoomByUsernames({
            modify,
            user: sender,
            room,
            usernames: members.map((member) => member.username),
        });
    }
}

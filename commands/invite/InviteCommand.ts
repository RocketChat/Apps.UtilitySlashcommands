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

export class InviteCommand implements ISlashCommand {
    public command: string = 'invite';
    public i18nDescription: string = 'invite_description';
    public i18nParamsExample: string = 'invite_params';
    public providesPreview: boolean = false;

    constructor(private readonly app: UtilitySlashcommandsApp) {}

    public async executor(
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persis: IPersistence,
    ): Promise<void> {
        let [username] = context.getArguments();
        const sender = context.getSender();
        const room = context.getRoom();
        if (!username.startsWith('@')) {
            return notifyUser({
                modify,
                room,
                receiver: sender,
                sender: this.app.cat,
                text: 'invalid use of command',
            });
        }
        username = username.substring(1);
        const user = await read.getUserReader().getByUsername(username);
        if (!user) {
            return notifyUser({
                modify,
                room,
                receiver: sender,
                sender: this.app.cat,
                text: `user \`@${username}\` not found`,
            });
        }
        return addUsersToRoomByUsernames({
            modify,
            user: sender,
            room,
            usernames: [username],
        });
    }
}

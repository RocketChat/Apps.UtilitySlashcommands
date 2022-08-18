import {
    IHttp,
    IModify,
    IPersistence,
    IRead,
} from '@rocket.chat/apps-engine/definition/accessors';
import { RoomType } from '@rocket.chat/apps-engine/definition/rooms';
import {
    ISlashCommand,
    SlashCommandContext,
} from '@rocket.chat/apps-engine/definition/slashcommands';
import { notifyUser } from '../lib/communication';
import { UtilitySlashcommandsApp } from '../UtilitySlashcommandsApp';

export class CreateChannelCommand implements ISlashCommand {
    public command: string = 'create';
    public i18nParamsExample: string = 'create_params';
    public i18nDescription: string = 'create_description';
    public providesPreview: boolean = false;

    constructor(private readonly app: UtilitySlashcommandsApp) {}

    public async executor(
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persis: IPersistence,
    ): Promise<void> {
        const user = context.getSender();

        let [channelName] = context.getArguments();
        channelName = channelName.startsWith('#')
            ? channelName.substring(1).toLowerCase()
            : channelName.toLowerCase();
        if (!/^[a-z]/.test(channelName)) {
            return notifyUser({
                modify,
                receiver: user,
                sender: this.app.cat,
                room: context.getRoom(),
                text: 'invalid channel name',
            });
        }

        const creator = modify.getCreator();
        // FIXME check the returned error for 'error-already-exists'
        const id = await creator.finish(
            creator
                .startRoom()
                .setCreator(user)
                .setType(RoomType.CHANNEL)
                .setSlugifiedName(channelName),
        );
        if (!id) {
            throw new Error('failed to create channel ' + channelName);
        }
    }
}

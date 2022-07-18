import {
    IHttp,
    IMessageBuilder,
    IModify,
    IModifyCreator,
    IPersistence,
    IRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import { IMessage } from "@rocket.chat/apps-engine/definition/messages";
import { IRoom } from "@rocket.chat/apps-engine/definition/rooms";
import {
    ISlashCommand,
    SlashCommandContext,
} from "@rocket.chat/apps-engine/definition/slashcommands";
import { IUser } from "@rocket.chat/apps-engine/definition/users";

export class Archiveroom implements ISlashCommand {
    public command: string = "archiveroom";
    public i18nDescription: string = "Slash_Archiveroom_Description";
    public i18nParamsExample: string = "";
    public providesPreview: boolean = false;
    public async executor(
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persis: IPersistence
    ): Promise<void> {
        const { id } = context.getRoom();
        const user = context.getSender();
        const updater = modify.getUpdater();
        // @ts-ignore
        const roomModify = (await updater.room(id, user)).setArchived(true);
        await updater.finish(roomModify);
    }
}

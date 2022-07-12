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

export class Lennyface implements ISlashCommand {
    public command: string = "lennyface";
    public i18nDescription: string = "Slash_Lennyface_Description";
    public i18nParamsExample: string = "";
    public providesPreview: boolean = false;
    public async executor(
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persis: IPersistence
    ): Promise<void> {
        const creator: IModifyCreator = modify.getCreator();
        const room: IRoom = context.getRoom();
        const sender: IUser = (await read
            .getUserReader()
            .getAppUser()) as IUser;

        const messageTemplate: IMessage = {
            text: "( ͡° ͜ʖ ͡°)",
            sender,
            room,
        };
        const messageBuilder: IMessageBuilder =
            creator.startMessage(messageTemplate);
        await creator.finish(messageBuilder);
    }
}
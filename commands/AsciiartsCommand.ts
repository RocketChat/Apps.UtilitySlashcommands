import {
    IRead,
    IModify,
    IHttp,
    IPersistence,
} from "@rocket.chat/apps-engine/definition/accessors";
import {
    ISlashCommand,
    SlashCommandContext,
} from "@rocket.chat/apps-engine/definition/slashcommands";

export class AsciiartsCommand implements ISlashCommand {
    command: string;
    i18nParamsExample: string;
    i18nDescription: string;
    permission?: string | undefined;
    providesPreview: boolean;
    async executor(
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persis: IPersistence
    ): Promise<void> {}
}

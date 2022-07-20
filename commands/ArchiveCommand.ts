import {
    IHttp,
    IModify,
    IPersistence,
    IRead,
} from "@rocket.chat/apps-engine/definition/accessors";
import {
    ISlashCommand,
    SlashCommandContext,
} from "@rocket.chat/apps-engine/definition/slashcommands";
import { archiveRoom } from "../lib/archive";

export class ArchiveCommand implements ISlashCommand {
    public command: string = "archive";
    public i18nParamsExample: string = "archive_params";
    public i18nDescription: string = "archive_description";
    public permission?: string | undefined;
    public providesPreview: boolean = false;

    public async executor(
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persis: IPersistence
    ): Promise<void> {
        return archiveRoom(context, read, modify);
    }
}

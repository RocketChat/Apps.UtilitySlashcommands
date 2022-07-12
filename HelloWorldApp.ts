import {
    IAppAccessors,
    IConfigurationExtend,
    IEnvironmentRead,
    ILogger,
} from "@rocket.chat/apps-engine/definition/accessors";
import { App } from "@rocket.chat/apps-engine/definition/App";
import { IAppInfo } from "@rocket.chat/apps-engine/definition/metadata";
import { table } from "console";
import { Gimmee } from "./Commands/Gimmee";
import { Lennyface } from "./Commands/Lennyface";
import { Shrug } from "./Commands/Shrug";
import { Tableflip } from "./Commands/Tableflip";
import { Unflip } from "./Commands/Unflip";

export class HelloWorldApp extends App {
    public appLogger: ILogger;
    constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
        super(info, logger, accessors);
    }
    public async extendConfiguration(
        configuration: IConfigurationExtend,
        environmentRead: IEnvironmentRead
    ): Promise<void> {
        const gimmee: Gimmee = new Gimmee();
        await configuration.slashCommands.provideSlashCommand(gimmee);
        const lennyface: Lennyface = new Lennyface();
        await configuration.slashCommands.provideSlashCommand(lennyface);
        const shrug: Shrug = new Shrug();
        await configuration.slashCommands.provideSlashCommand(shrug);
        const tableflip: Tableflip = new Tableflip();
        await configuration.slashCommands.provideSlashCommand(tableflip);
        const unflip: Unflip = new Unflip();
        await configuration.slashCommands.provideSlashCommand(unflip);
    }
}

import {
    IAppAccessors,
    IConfigurationExtend,
    IConfigurationModify,
    IEnvironmentRead,
    ILogger,
} from '@rocket.chat/apps-engine/definition/accessors';
import { App } from '@rocket.chat/apps-engine/definition/App';
import { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';
import { IUser } from '../Rocket.Chat.Apps-engine/definition/users';
import commands from './commands';

export class UtilitySlashcommandsApp extends App {
    public me!: IUser;
    public cat!: IUser;

    constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
        super(info, logger, accessors);
    }

    public async onEnable(
        environment: IEnvironmentRead,
        configurationModify: IConfigurationModify,
    ): Promise<boolean> {
        const read = this.getAccessors().reader;
        this.me = (await read
            .getUserReader()
            .getAppUser(this.getID())) as IUser;
        this.cat = (await read
            .getUserReader()
            .getByUsername('rocket.cat')) as IUser;
        return Boolean(this.me);
    }

    protected async extendConfiguration(
        configuration: IConfigurationExtend,
        environmentRead: IEnvironmentRead,
    ): Promise<void> {
        await Promise.all(
            commands.map((CommandClass) =>
                configuration.slashCommands.provideSlashCommand(
                    new CommandClass(this),
                ),
            ),
        );
    }
}

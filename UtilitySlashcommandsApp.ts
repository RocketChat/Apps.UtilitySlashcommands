import type { IAppAccessors, IConfigurationExtend, IConfigurationModify, IEnvironmentRead, ILogger } from '@rocket.chat/apps-engine/definition/accessors';
import { App } from '@rocket.chat/apps-engine/definition/App';
import type { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';
import type { IUser } from '../Rocket.Chat.Apps-engine/definition/users';
import commands from './Commands';

import commands from './Commands';

export class UtilitySlashcommandsApp extends App {
  public me!: IUser;

  constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
    super(info, logger, accessors);
  }

  public async onEnable(environment: IEnvironmentRead, configurationModify: IConfigurationModify): Promise<boolean> {
    const read = this.getAccessors().reader;
    const cat = (await read.getUserReader().getByUsername('rocket.cat')) as IUser;
    this.me = cat || ((await read.getUserReader().getAppUser(this.getID())) as IUser);
    return Boolean(this.me);
  }

  protected async extendConfiguration(configuration: IConfigurationExtend, environmentRead: IEnvironmentRead): Promise<void> {
    await Promise.all(commands.map((CommandClass) => new CommandClass(this)));
  }
}

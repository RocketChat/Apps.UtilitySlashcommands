import type { IModify, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import type { ISlashCommand, SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands';
import { UserStatusConnection } from '@rocket.chat/apps-engine/definition/users';
import type { UtilitySlashcommandsApp } from '../../UtilitySlashcommandsApp';
import { changeStatus } from '../../Lib/changeStatus';

export class Invisible implements ISlashCommand {
  public command: string = 'invisible';
  public i18nDescription: string = 'status_in_description';
  public i18nParamsExample: string = 'status_in_params';
  public providesPreview: boolean = false;

  constructor(private readonly app: UtilitySlashcommandsApp) {}

  public async executor(context: SlashCommandContext, read: IRead, modify: IModify): Promise<void> {
    return await changeStatus(modify, context.getSender(), UserStatusConnection.INVISIBLE);
  }
}

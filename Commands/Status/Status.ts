import { IHttp, IModify, IPersistence, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { ISlashCommand, SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands';
import { IUser, UserStatusConnection } from '@rocket.chat/apps-engine/definition/users';
import { IRoom } from '@rocket.chat/apps-engine/definition/rooms';
import type { UtilitySlashcommandsApp } from '../../UtilitySlashcommandsApp';
import { sendNotification } from '../../Lib/message';

export class Status implements ISlashCommand {
  public command: string = 'status';
  public i18nDescription: string = 'status_description';
  public i18nParamsExample: string = 'status_params';
  public providesPreview: boolean = false;

  constructor(private readonly app: UtilitySlashcommandsApp) {}

  public async executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp, persis: IPersistence): Promise<void> {
    const statusText = context.getArguments().join(' ');
    const user = context.getSender();
    await modify.getUpdater().getUserUpdater().updateStatusText(user, statusText);
  }
}

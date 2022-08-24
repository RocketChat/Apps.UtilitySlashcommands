import { IHttp, IModify, IPersistence, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { ISlashCommand, SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands';
import { IUser, UserStatusConnection } from '@rocket.chat/apps-engine/definition/users';
import { IRoom } from '@rocket.chat/apps-engine/definition/rooms';
import type { UtilitySlashcommandsApp } from '../UtilitySlashcommandsApp';
import { sendNotification } from '../lib/message';

export class Status implements ISlashCommand {
  public command: string = 'status';
  public i18nDescription: string = 'status_description';
  public i18nParamsExample: string = 'status_params';
  public providesPreview: boolean = false;

  constructor(private readonly app: UtilitySlashcommandsApp) {}

  public async executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp, persis: IPersistence): Promise<void> {
    const command = this.getCommandFromContext(context);

    if (!command) {
      return await this.displayHelpMessage(read, modify, context.getSender(), context.getRoom());
    }

    switch (command) {
      case 'help':
        return await this.displayHelpMessage(read, modify, context.getSender(), context.getRoom());
      case 'online':
      case 'on':
        return await this.setStatus(modify, context.getSender(), UserStatusConnection.ONLINE);
      case 'away':
        return await this.setStatus(modify, context.getSender(), UserStatusConnection.AWAY);
      case 'busy':
        return await this.setStatus(modify, context.getSender(), UserStatusConnection.BUSY);
      case 'offline':
      case 'off':
        return await this.setStatus(modify, context.getSender(), UserStatusConnection.OFFLINE);
      default:
        return await this.displayHelpMessage(read, modify, context.getSender(), context.getRoom());
    }
  }

  private getCommandFromContext(context: SlashCommandContext): string {
    const [command] = context.getArguments();
    return command;
  }

  private async setStatus(modify: IModify, user: IUser, status: UserStatusConnection): Promise<void> {
    await modify.getUpdater().getUserUpdater().updateStatus(user, '', status);
    return;
  }

  private async displayHelpMessage(read: IRead, modify: IModify, user: IUser, room: IRoom): Promise<void> {
    const text = `This is all options for /status:
    *help:* shows this list;
    *online* or *on* Show as online;
    *away* Show as away;
    *busy* Show as busy;
    *offline* or *off* Show as offline;`;
    await sendNotification(read, modify, user, room, text);
    return;
  }
}

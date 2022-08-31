import { IHttp, IModify, IPersistence, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { ISlashCommand, SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands';
import { sendMessageToRoom } from '../../lib/communication';
import type { UtilitySlashcommandsApp } from '../../UtilitySlashcommandsApp';
import { AsciiArtCommand } from './enum';

export class TableflipCommand implements ISlashCommand {
  public command: string = 'tableflip';
  public i18nDescription: string = 'tableflip_description';
  public i18nParamsExample: string = 'tableflip_params';
  public providesPreview: boolean = false;

  constructor(private readonly app: UtilitySlashcommandsApp) {}

  public async executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp, persis: IPersistence): Promise<void> {
    const message = context.getArguments().join(' ');
    await sendMessageToRoom({
      modify,
      room: context.getRoom(),
      sender: context.getSender(),
      text: message.length ? `${AsciiArtCommand.TABLEFLIP} ${message}` : AsciiArtCommand.TABLEFLIP,
    });
  }
}

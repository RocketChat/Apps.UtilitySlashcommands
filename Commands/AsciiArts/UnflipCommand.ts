import { IHttp, IModify, IPersistence, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { ISlashCommand, SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands';
import { sendMessageToRoom } from '../../Lib/communication';
import type { UtilitySlashcommandsApp } from '../../UtilitySlashcommandsApp';
import { AsciiArtCommand } from './enum';

export class UnflipCommand implements ISlashCommand {
  public command: string = 'unflip';
  public i18nDescription: string = 'unflip_description';
  public i18nParamsExample: string = 'unflip_params';
  public providesPreview: boolean = false;

  constructor(private readonly app: UtilitySlashcommandsApp) {}

  public async executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp, persis: IPersistence): Promise<void> {
    const message = context.getArguments().join(' ');
    await sendMessageToRoom({
      modify,
      room: context.getRoom(),
      sender: context.getSender(),
      text: message.length ? `${AsciiArtCommand.UNFLIP} ${message}` : AsciiArtCommand.UNFLIP,
    });
  }
}

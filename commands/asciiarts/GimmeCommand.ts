import {
  IHttp,
  IModify,
  IPersistence,
  IRead,
} from '@rocket.chat/apps-engine/definition/accessors';
import {
  ISlashCommand,
  SlashCommandContext,
} from '@rocket.chat/apps-engine/definition/slashcommands';
import { sendMessage } from '../../lib/communication';
import { UtilitySlashcommandsApp } from '../../UtilitySlashcommandsApp';
import { AsciiArtCommand } from './lib';

export class GimmeCommand implements ISlashCommand {
  public command: string = 'gimme';
  public i18nDescription: string = 'gimme_description';
  public i18nParamsExample: string = 'gimme_params';
  public providesPreview: boolean = false;

  constructor(private readonly app: UtilitySlashcommandsApp) { }

  public async executor(
    context: SlashCommandContext,
    read: IRead,
    modify: IModify,
    http: IHttp,
    persis: IPersistence,
  ): Promise<void> {
    const message = context.getArguments().join(' ');
    const sender = context.getSender();
    const room = context.getRoom();

    return sendMessage({
      modify,
      room,
      sender,
      text: `${AsciiArtCommand.GIMME} ${message}`,
    });
  }
}

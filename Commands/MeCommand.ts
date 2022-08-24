import { IHttp, IModify, IPersistence, IRead } from '@rocket.chat/apps-engine/definition/accessors';
import { ISlashCommand, SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands';
import type { UtilitySlashcommandsApp } from '../UtilitySlashcommandsApp';

export class MeCommand implements ISlashCommand {
  public command: string = 'me';
  public i18nDescription: string = 'me_description';
  public i18nParamsExample: string = 'me_params';
  public providesPreview: boolean = false;

  constructor(private readonly app: UtilitySlashcommandsApp) {}

  public async executor(context: SlashCommandContext, read: IRead, modify: IModify, http: IHttp, persis: IPersistence): Promise<void> {
    const message = context.getArguments().join(' ');
    if (!message) {
      return;
    }
    const creator = modify.getCreator();
    await creator.finish(creator.startMessage().setSender(context.getSender()).setRoom(context.getRoom()).setText(`_${message}_`));
  }
}

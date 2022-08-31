import { MeCommand } from './MeCommand';
import { Status } from './status';
import asciiarts_commands from './AsciiArts';

const commands = [...asciiarts_commands, MeCommand, Status] as const;

export default commands;

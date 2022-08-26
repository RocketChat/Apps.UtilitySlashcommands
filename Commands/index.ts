import { MeCommand } from './MeCommand';

import asciiarts_commands from './AsciiArts';

const commands = [...asciiarts_commands, MeCommand] as const;

export default commands;

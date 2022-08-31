import { MeCommand } from './MeCommand';
import { Away, Busy, Invisible, Offline, Online, Status } from './Status/index';
import asciiarts_commands from './AsciiArts';

const commands = [
  // Status
  Away,
  Online,
  Offline,
  Invisible,
  Busy,
  Status,
  // Me
  MeCommand,
];

export default commands;

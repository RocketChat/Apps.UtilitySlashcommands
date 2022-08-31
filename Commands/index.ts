import { MeCommand } from './MeCommand';
import { Away, Busy, Invisible, Offline, Online, Status } from './Status/index';
import { GimmeCommand, LennyfaceCommand, TableflipCommand, UnflipCommand, ShrugCommand } from './AsciiArts/index';

const commands = [
  // Status
  Away,
  Online,
  Offline,
  Invisible,
  Busy,
  Status,
  // AsciiArts
  GimmeCommand,
  LennyfaceCommand,
  TableflipCommand,
  UnflipCommand,
  ShrugCommand,
  // Me
  MeCommand,
];

export default commands;

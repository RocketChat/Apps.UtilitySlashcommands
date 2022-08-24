import { MeCommand } from './MeCommand';
import { Status } from './status';

const commands = [MeCommand, Status] as const;

export default commands;

import { ArchiveCommand } from './ArchiveCommand';
import { CreateChannelCommand } from './CreateChannelCommand';
import { UnarchiveCommand } from './UnarchiveCommand';

import ascii_commands from './asciiarts';
import invite_commands from './invite';

const commands = [
    ...ascii_commands,
    ...invite_commands,
    ArchiveCommand,
    UnarchiveCommand,
    CreateChannelCommand,
];

export default commands;

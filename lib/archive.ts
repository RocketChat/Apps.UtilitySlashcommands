import { IModify, IRead } from "@rocket.chat/apps-engine/definition/accessors";
import { IRoom } from "@rocket.chat/apps-engine/definition/rooms";
import { SlashCommandContext } from "@rocket.chat/apps-engine/definition/slashcommands";
import { notifyUser } from "./comms";

async function perform(
    context: SlashCommandContext,
    read: IRead,
    modify: IModify,
    status: IRoom["isArchived"]
): Promise<void> {
    const user = context.getSender();
    const room = await (async () => {
        const [, maybeName] = context.getArguments();
        if (!maybeName) {
            return context.getRoom();
        }
        if (maybeName.startsWith("@")) {
            await notifyUser(
                // @ts-ignore
                read,
                modify,
                context.getRoom(),
                "can not archive a direct message"
            );
            throw new Error("attempting to archive a direct message");
        }
        const name = maybeName.startsWith("#")
            ? maybeName.substring(1)
            : maybeName;
        return read.getRoomReader().getByName(name);
    })();
    if (!room) {
        await notifyUser(
            // @ts-ignore
            read,
            modify,
            context.getRoom(),
            "no room found with name"
        );
        throw new Error("no room found");
    }

    if (room.isArchived === status) {
        notifyUser(
            read,
            modify,
            context.getRoom(),
            `${room.slugifiedName} is ${
                status ? "already archive" : "not archived"
            }`
        );
        return;
    }

    const roomBuilder = await modify.getUpdater().room(room.id, user);
    roomBuilder.setArchived(status);
    return modify.getUpdater().finish(roomBuilder);
}

const archiveRoom = (
    context: SlashCommandContext,
    read: IRead,
    modify: IModify
): Promise<void> => perform(context, read, modify, true);

const unarchiveRoom = (
    context: SlashCommandContext,
    read: IRead,
    modify: IModify
): Promise<void> => perform(context, read, modify, false);

export { archiveRoom, unarchiveRoom };

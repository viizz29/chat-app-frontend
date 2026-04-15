import { setupWorker } from "msw/browser";
import { handlers as authHandlers } from "./auth-handlers";
import { handlers as todoHandlers } from "./todo-handlers";
import { handlers as studentHandlers } from "./students-handlers";
import {handlers as fileHandlers} from "./files-handlers";
import {handlers as chatMessageHandlers} from "./chat-message-handlers";


export const worker = setupWorker(
    ...authHandlers,
    ...todoHandlers,
    ...studentHandlers,
    ...fileHandlers,
    ...chatMessageHandlers,
);
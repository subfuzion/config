/// <reference types="node" />
import { Server } from "node:http";
declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}
export declare function start(port: number | string): Promise<Server>;
export declare function stop(signal?: string | Error): Promise<void>;
//# sourceMappingURL=app.d.ts.map
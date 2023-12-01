/// <reference types="node" resolution-mode="require"/>
import { Server } from "node:http";
export declare function start(port: number | string): Promise<Server>;
export declare function stop(signal?: string | Error): Promise<void>;
//# sourceMappingURL=app.d.ts.map
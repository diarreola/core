import { Contracts } from "@arkecosystem/core-kernel";

import { ConnectionFactory } from "./factory";

// todo: review the implementation - still needed?
export class ConnectionManager {
    private readonly factory: ConnectionFactory = new ConnectionFactory();
    private readonly connections: Map<string, Contracts.TransactionPool.Connection> = new Map<
        string,
        Contracts.TransactionPool.Connection
    >();

    public connection(name = "default"): Contracts.TransactionPool.Connection | undefined {
        return this.connections.get(name);
    }

    public async createConnection(
        connection: Contracts.TransactionPool.Connection,
        name = "default",
    ): Promise<Contracts.TransactionPool.Connection | undefined> {
        this.connections.set(name, await this.factory.make(connection));

        return this.connection(name);
    }
}

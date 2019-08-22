import { Contracts, Support, Types } from "@arkecosystem/core-kernel";
import { defaults } from "./defaults";
import { Server } from "./server";

export class ServiceProvider extends Support.AbstractServiceProvider {
    public async register(): Promise<void> {
        if (!this.opts.enabled) {
            this.app.resolve<Contracts.Kernel.ILogger>("log").info("Public API is disabled");
            return;
        }

        const server = new Server(this.opts);
        await server.start();

        this.app.bind("api", server);
        this.app.bind("api.options", this.opts);
    }

    public async dispose(): Promise<void> {
        if (this.opts.enabled) {
            this.app.resolve<Contracts.Kernel.ILogger>("log").info(`Stopping Public API`);

            await this.app.resolve<Server>("api").stop();
        }
    }

    public manifest(): Types.PackageJson {
        return require("../package.json");
    }

    public configDefaults(): Types.ConfigObject {
        return defaults;
    }

    public provides(): string[] {
        return ["api"];
    }
}
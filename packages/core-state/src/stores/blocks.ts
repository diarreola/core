import { Container, Utils } from "@arkecosystem/core-kernel";
import { Interfaces } from "@arkecosystem/crypto";
import assert from "assert";

// todo: review its implementation and finally integrate it as planned in v2
@Container.injectable()
export class BlockStore {
    private readonly byId: Utils.CappedMap<string, Interfaces.IBlockData>;
    private readonly byHeight: Utils.CappedMap<number, Interfaces.IBlockData>;
    private lastBlock: Interfaces.IBlock | undefined;

    public constructor(maxSize: number) {
        this.byId = new Utils.CappedMap<string, Interfaces.IBlockData>(maxSize);
        this.byHeight = new Utils.CappedMap<number, Interfaces.IBlockData>(maxSize);
    }

    public get(key: string | number): Interfaces.IBlockData | undefined {
        return typeof key === "string" ? this.byId.get(key) : this.byHeight.get(key);
    }

    public set(value: Interfaces.IBlock): void {
        const lastBlock: Interfaces.IBlock = Utils.assert.defined(this.last());

        assert.strictEqual(value.data.height, lastBlock ? lastBlock.data.height + 1 : 1);

        this.byId.set(Utils.assert.defined(value.data.id), value.data);
        this.byHeight.set(value.data.height, value.data);
        this.lastBlock = value;
    }

    public has(value: Interfaces.IBlockData): boolean {
        return this.byId.has(Utils.assert.defined(value.id)) || this.byHeight.has(value.height);
    }

    public delete(value: Interfaces.IBlockData): void {
        this.byId.delete(Utils.assert.defined(value.id));
        this.byHeight.delete(value.height);
    }

    public clear(): void {
        this.byId.clear();
        this.byHeight.clear();
    }

    public resize(maxSize: number): void {
        this.byId.resize(maxSize);
        this.byHeight.resize(maxSize);
    }

    public last(): Interfaces.IBlock | undefined {
        return this.lastBlock;
    }

    public values(): Interfaces.IBlockData[] {
        return this.byId.values();
    }

    public count(): number {
        return this.byId.count();
    }

    public getIds(): string[] {
        return this.byId.keys();
    }

    public getHeights(): number[] {
        return this.byHeight.keys();
    }
}

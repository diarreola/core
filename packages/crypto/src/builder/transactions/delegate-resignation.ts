import { TransactionTypes } from "../../constants";
import { feeManager } from "../../managers/fee";
import { TransactionBuilder } from "./transaction";

export class DelegateResignationBuilder extends TransactionBuilder {
    /**
     * @constructor
     */
    constructor() {
        super();

        this.data.type = TransactionTypes.DelegateResignation;
        this.data.fee = feeManager.get(TransactionTypes.DelegateResignation);
    }
}
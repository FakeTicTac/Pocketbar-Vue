import { BaseService } from "./BaseService";
import type { IAmountUnit } from "@/domain/IAmountUnit";


/**
 * Class Defines Amount Unit Service Basic Operations With Backend. (Connect And Retreive Data)
 */
export class AmountUnitService extends BaseService<IAmountUnit> {

    /**
     * Basic Service Constructor. Defines Specific Path To Be Accessed In Backend.
     */
    constructor() {
        super("amountunit");
    }
}

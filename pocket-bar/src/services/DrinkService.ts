import { BaseService } from "./BaseService";
import type { IDrink } from "@/domain/IDrink";


/**
 * Class Defines Drink Service Basic Operations With Backend. (Connect And Retreive Data)
 */
export class DrinkService extends BaseService<IDrink> {

    /**
     * Basic Service Constructor. Defines Specific Path To Be Accessed In Backend.
     */
    constructor() {
        super("drink");
    }
}

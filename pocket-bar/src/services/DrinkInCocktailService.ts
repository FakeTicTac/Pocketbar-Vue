import { BaseService } from "./BaseService";
import type { IDrinkInCocktail } from "@/domain/IDrinkInCocktail";


/**
 * Class Defines Drink In Cocktail Service Basic Operations With Backend. (Connect And Retreive Data)
 */
export class DrinkInCocktailService extends BaseService<IDrinkInCocktail> {

    /**
     * Basic Service Constructor. Defines Specific Path To Be Accessed In Backend.
     */
    constructor() {
        super("drinkincocktail");
    }
}

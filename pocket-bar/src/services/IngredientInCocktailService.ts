import { BaseService } from "./BaseService";
import type { IIngredientInCocktail } from "@/domain/IIngredientInCocktail";


/**
 * Class Defines Ingredient In Cocktail Service Basic Operations With Backend. (Connect And Retreive Data)
 */
export class IngredientInCocktailService extends BaseService<IIngredientInCocktail> {

    /**
     * Basic Service Constructor. Defines Specific Path To Be Accessed In Backend.
     */
    constructor() {
        super("ingredientincocktail");
    }
}

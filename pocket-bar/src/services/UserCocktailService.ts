import { BaseService } from "./BaseService";
import type { IUserCocktail } from "@/domain/IUserCocktail";


/**
 * Class Defines User Cocktail Service Basic Operations With Backend. (Connect And Retreive Data)
 */
export class UserCocktailService extends BaseService<IUserCocktail> {

    /**
     * Basic Service Constructor. Defines Specific Path To Be Accessed In Backend.
     */
    constructor() {
        super("usercocktail");
    }
}

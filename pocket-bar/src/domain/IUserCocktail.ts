
/**
 * Interface Represents User Cocktail Data To Be Sent To And Received From Backend .
 */
 export interface IUserCocktail {

    id?: string;
    comment: string;
    appUserId?: string;
    cocktailId: string;
    ratingId: string;

    // Full Data Fields Going Next.

    cocktailName?: {
        "en-GB": string,
        "ee-ET": string,
        "ru-RU": string,
    };
    ratingValue?: string;
    coverImagePath?: string;
    
}
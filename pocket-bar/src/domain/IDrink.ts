

/**
 * Interface Represents Drink Data To Be Sent To And Received From Backend .
 */
 export interface IDrink {

    id?: string;
    name: {
        "en-GB": string,
        "ee-ET": string,
        "ru-RU": string,
    };
    drinkTypeId: string;
    description?: {
        "en-GB": string,
        "ee-ET": string,
        "ru-RU": string,
    };
    alcoholByVolume: number;
    coverImagePath?: string;

    // Collection Counters Going Next.
    
    drinkInCocktailsCount?: number;

    // Full Data Fields Going Next.

    drinkTypeName?: {
        "en-GB": string,
        "ee-ET": string,
        "ru-RU": string,
    };

    // Client Selection Field.
    
    isSelected?: boolean;

}
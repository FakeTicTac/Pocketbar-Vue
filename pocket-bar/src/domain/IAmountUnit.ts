
/**
 * Interface Represents Amount Unit Data To Be Sent To And Received From Backend .
 */
 export interface IAmountUnit {

    id?: string;
    name: {
        "en-GB": string,
        "ee-ET": string,
        "ru-RU": string,
    };
    usageWithDrinksCount?: number;
    usageWithIngredientsCount?: number

}

/**
 * Interface Represents Rating Data To Be Sent To And Received From Backend .
 */
 export interface IRating {

    id?: string;
    gradeValue: string;
    description?: {
        "en-GB": string,
        "ee-ET": string,
        "ru-RU": string,
    };

    // Collection Counters Going Next.
    
    usageCount?: number;
    
}
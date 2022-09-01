import { BaseService } from "./BaseService";
import type { IRating } from "@/domain/IRating";


/**
 * Class Defines Rating Service Basic Operations With Backend. (Connect And Retreive Data)
 */
export class RatingService extends BaseService<IRating> {

    /**
     * Basic Service Constructor. Defines Specific Path To Be Accessed In Backend.
     */
    constructor() {
        super("rating");
    }
}

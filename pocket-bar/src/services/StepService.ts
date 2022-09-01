import { BaseService } from "./BaseService";
import type { IStep } from "@/domain/IStep";


/**
 * Class Defines Step Service Basic Operations With Backend. (Connect And Retreive Data)
 */
export class StepService extends BaseService<IStep> {

    /**
     * Basic Service Constructor. Defines Specific Path To Be Accessed In Backend.
     */
    constructor() {
        super("step");
    }
}

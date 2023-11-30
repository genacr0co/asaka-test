import {Item} from "shared/lib/types";

export interface Props {
    list: Item[],
    is_parent: boolean;
    id?: number;
}
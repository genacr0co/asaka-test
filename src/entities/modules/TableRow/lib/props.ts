import {Item} from "shared/lib/types";
import {Dispatch, SetStateAction} from "react";

export interface Props {
    id: number;
    title: string;
    index: number;
    divider: number | null;
    setDivider: Dispatch<SetStateAction<number | null>>;
    is_parent: boolean;

    parents_id?: number[];
    sub?: Item[];
}
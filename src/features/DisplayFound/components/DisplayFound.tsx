import React from "react";
import {useStore} from "shared/lib/vStore";

import {Props} from "../lib/props";
import styles from '../styles/DisplayFound.module.css';

export const DisplayFound = (props: Props) => {
    const {list} = useStore();
    return (
        <div className={styles.Root}>
            Найдено: {list.length}
        </div>
    );
};
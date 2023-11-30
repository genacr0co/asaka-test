import React, {useContext} from "react";
import {observer} from "mobx-react";
import {Context} from "shared/lib/context";

import {Props} from "../lib/props";
import styles from '../styles/DisplayFound.module.css';

export const DisplayFound = observer((props: Props) => {
    const {store} = useContext(Context);
    const {list} = store;

    return (
        <div className={styles.Root}>
            Найдено: {list.length}
        </div>
    );
});
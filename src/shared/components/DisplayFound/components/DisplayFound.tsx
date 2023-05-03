import {Props} from "../lib/props";
import styles from '../styles/DisplayFound.module.css';
import React from "react";

export const DisplayFound = (props: Props) => {
    return (
        <div className={styles.Root}>
            Найдено: {props.count}
        </div>
    );
};
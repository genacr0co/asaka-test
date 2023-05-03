import {Props} from "../lib/props";
import styles from '../styles/PageTitle.module.css';
import React from "react";

export const PageTitle = (props: Props) => {
    return (
        <div className={styles.Root}>
            {props.title}
        </div>
    );
};
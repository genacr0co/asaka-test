import React from "react";

import {Table} from "widgets";
import {DisplayFound} from "features";
import {PageTitle} from "shared/components";

import styles from './Page.module.css';

export function Page() {
    return (
        <div className={styles.Root}>
            <div className={styles.FlexRow}>
                <PageTitle title={'Список тем обращения и продуктов'}/>
                <DisplayFound/>
            </div>
            <Table/>
        </div>
    );
}
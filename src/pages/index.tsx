import React from "react";
import {DisplayFound, PageTitle} from "shared/components";
import styles from './Page.module.css';
import {Table} from "../widgets/Table";

export function Page() {
    return (
        <div className={styles.Root}>
            <div className={styles.FlexRow}>
                <PageTitle title={'Список тем обращения и продуктов'}/>
                <DisplayFound count={3}/>
            </div>

            <Table/>

        </div>
    );
}

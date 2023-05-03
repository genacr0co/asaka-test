import React from "react";
import {DisplayFound, PageTitle} from "shared/components";
import styles from './Page.module.css';
import {Table} from "../widgets/Table";
import {Draggable} from "shared/components/Draggable";

export function Page() {
    return (
        <div className={styles.Root}>
            <div className={styles.FlexRow}>
                <PageTitle title={'Список тем обращения и продуктов'}/>
                <DisplayFound count={3}/>
            </div>

            <Draggable>
                <DisplayFound count={3}/>
            </Draggable>

            <Table/>

        </div>
    );
}

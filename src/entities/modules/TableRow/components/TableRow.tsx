import React from "react";
import {ArrowCheckbox, FolderIcon, MenuButton, SubFolderIcon} from "shared/components";

import {Props} from "../lib/props";
import styles from '../styles/TableRow.module.css';

export const TableRow = (props: Props) => {

    return (
        <div className={`${styles.Root} ${props.is_parent && styles.Parent}`}>
            <div className={styles.FlexRow}>

                <div className={styles.column} style={{width: 62}}>
                    <div className={styles.columnTitle}>
                        №
                    </div>
                    <div className={styles.Title}>
                        <span>
                            {/*{props.parent_id !== undefined ? `${props.parent_id}.` : ''}{props.id}*/}
                        </span>
                    </div>
                </div>


                <div className={styles.column}
                     style={{width: props.sub !== undefined && props.sub.length > 0 ? 280.5 : 561}}>

                    <div className={styles.columnTitle}>
                        Название
                    </div>
                    <div className={styles.Name}>
                        {props.is_parent ? <FolderIcon/> : <SubFolderIcon/>}
                        <span>{props.title}</span>
                    </div>
                </div>

                <div className={styles.column}
                     style={{width: props.sub !== undefined && props.sub.length > 0 ? 280.5 : '50%'}}

                >
                    <div className={styles.columnTitle}>
                        Очередность
                    </div>
                    <div className={styles.Title}>
                        <span>{props.index + 1}</span>
                    </div>
                </div>

                {
                    props.sub !== undefined &&

                    <div className={styles.column}
                         style={{overflow: 'hidden', textOverflow: 'ellipsis', width: '50%'}}
                    >
                        <div className={styles.columnTitle}>
                            Подкатегории
                        </div>

                        <div className={styles.Title}>

                            <span>
                                {
                                    props.sub.map((sub, i, array) => `${sub.title} ${array.length - 1 !== i ? '/' : ''}`)
                                }
                            </span>

                        </div>

                    </div>
                }
            </div>

            <div className={styles.Actions}>
                {
                    props.sub !== undefined && props.sub.length > 0 &&
                    <>
                        <div className={styles.SubLength}>
                            {props.sub.length}
                        </div>

                        <ArrowCheckbox checked={props.divider === props.id} onClick={() => {
                            if (props.divider !== props.id) {
                                props.setDivider(props.id)
                            } else {
                                props.setDivider(null)
                            }
                        }}/>
                    </>
                }
                <MenuButton/>
            </div>
        </div>
    );
};
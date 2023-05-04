import {Props} from "../lib/props";
import styles from '../styles/ArrowCheckbox.module.css';
import {MenuButtonIcon} from "./MenuButtonIcon";

export const MenuButton = (props: Props) => {
    return (
        <div onClick={props.onClick} className={styles.Root}>
            <MenuButtonIcon/>
        </div>
    );
};
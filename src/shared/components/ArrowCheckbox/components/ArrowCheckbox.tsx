import {Props} from "../lib/props";
import styles from '../styles/ArrowCheckbox.module.css';
import {CheckedArrow} from "./CheckedArrow";
import {DefaultArrow} from "./DefaultArrow";

export const ArrowCheckbox = (props: Props) => {
    return (
        <div onClick={props.onClick} className={`${styles.Root} ${props.checked ? styles.checked : ''}`}>
            {props.checked ? <CheckedArrow/> : <DefaultArrow/>}
        </div>
    );
};
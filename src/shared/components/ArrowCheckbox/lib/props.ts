import React from "react";

export interface Props {
    checked?: boolean;
    onClick?: (e?: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
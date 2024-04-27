import { IconProp } from "@fortawesome/fontawesome-svg-core";

export type MenuItemType = {
    title: string;
    icon: IconProp;
    path: string;
    children?: MenuItemType[];
}
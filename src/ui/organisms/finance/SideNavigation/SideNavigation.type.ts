export interface SideNavigationItem {
    title: string;
    href?: string;
    hash?: string;
}

export interface SideNavigationProps {
    items: SideNavigationItem[];
}
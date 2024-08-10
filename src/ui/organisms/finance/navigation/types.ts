export interface NavigationItem {
    title: string;
    href?: string;
    hash?: string;
}

export interface NavigationProps {
    items: NavigationItem[];
}

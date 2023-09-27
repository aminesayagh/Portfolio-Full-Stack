import { IconNames } from '@/components/ui';
export type CursorNames = 'CursorScroll' | 'CursorActionIcon' | 'CursorEvent';

export interface ItemCursorPropsByComponent {
    'CursorScroll': {
        title: string
    }
    'CursorActionIcon': {
        iconName: IconNames,
        degree: number,
    },
    'CursorEvent': {
        event: 'pointer'
    },
}

export interface ItemCursor<C extends CursorNames = 'CursorScroll',T extends ItemCursorPropsByComponent[C] = ItemCursorPropsByComponent[C]> {
    name: string,
    component: C,
    props: T,
}


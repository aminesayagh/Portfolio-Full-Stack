import { IconNames } from '@/components/ui/icon';

export const COMPONENT_NAMES = {
    CursorScroll: 'CursorScroll',
    CursorActionIcon: 'CursorActionIcon',
    CursorEvent: 'CursorEvent',
} as const;

export interface ItemCursorPropsByComponent {
    [COMPONENT_NAMES.CursorScroll]: {
        title?: string
    },
    [COMPONENT_NAMES.CursorActionIcon]: {
        iconName: IconNames,
        degree: number,
    },
    [COMPONENT_NAMES.CursorEvent]: {
        event: 'pointer'
    }
}


export type ItemCursor = {
    name: string,
} & ({
    component: typeof COMPONENT_NAMES['CursorScroll'],
    props: ItemCursorPropsByComponent['CursorScroll']
} | {
    component: typeof COMPONENT_NAMES['CursorActionIcon'],
    props: ItemCursorPropsByComponent['CursorActionIcon']
} | {
    component: typeof COMPONENT_NAMES['CursorEvent'],
    props: ItemCursorPropsByComponent['CursorEvent']
})


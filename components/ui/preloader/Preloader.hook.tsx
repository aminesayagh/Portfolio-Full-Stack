import { useContext } from 'react'

import { LoadingContext } from './Preloader.context';

export function usePreloader() {
    const context = useContext(LoadingContext);

    if(context === undefined) {
        console.warn(
            'react-locomotive-scroll: the context is missing. You may be using the hook without registering LocomotiveScrollProvider, or you may be using the hook in a component which is not wrapped by LocomotiveScrollProvider.'
        )
    }

    return context;
}

usePreloader.displayName = 'usePreloader';
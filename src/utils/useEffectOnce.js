import {useEffect} from 'react'

function useEffectOnce(cb) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return useEffect(cb, [])
    
}

export default useEffectOnce
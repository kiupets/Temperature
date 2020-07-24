import { useEffect, useState } from 'react'
function useDidMount() {
    const [didMount, setDidMount] = useState(false)
    useEffect(() => setDidMount(true), [])

    return didMount
}
export default useDidMount
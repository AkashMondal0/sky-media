'use client'
import socket from '@/lib/socket-io'
import { setMessage } from '@/redux/slice/conversation'
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'



const AppStart_Provider = () => {
    const session = useSession().data?.user
    const loadedRef = React.useRef(false)
    const dispatch = useDispatch()
    // const [isClient, setIsClient] = React.useState(false)

    useEffect(() => {
        if (!loadedRef.current && socket.connected && session?.id) {
            socket.emit('user-connect', session?.id)
            loadedRef.current = true;
        }
        socket.on('messageEventHandle', (data) => {
            dispatch(setMessage(data))
        })
        socket.on('messageSeenEventHandle', () => { })
        socket.on('messageTypingEventHandle', () => { })
        socket.on('connectionEventHandle', () => { })

        return () => {
            socket.off('messageEventHandle')
            socket.off('messageSeenEventHandle')
            socket.off('messageTypingEventHandle')
            socket.off('connectionEventHandle')
        }
    }, [session?.id])

    // useEffect(() => {
    //     setIsClient(true)
    // }, [])

    // if (!isClient) return null

    return (
        <></>
    )
}

export default AppStart_Provider

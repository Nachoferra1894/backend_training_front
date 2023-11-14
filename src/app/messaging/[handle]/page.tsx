'use client'
import React, {useState, useEffect} from 'react'
import io from 'socket.io-client'
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

interface Message {
    content: string,
    from: string,
    to: string,
}

export default function Messaging({ params }: { params: { handle: string } }) {
    const { handle: userId } = params
    const token = localStorage.getItem('token')
    const socket = io('http://localhost:8080', {
        auth: {
            token: token,
        }
    })
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState<Message[]>([]);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        socket.on('message', (message) => {
            console.log(message)
            // if (message.to !== userId) return
            // Update the chat with the received message

            if (!messages.includes(message)) {
                setMessages((messages) => [...messages, message])
            }
        })
        socket.on('error', (errors) => {
            console.log(errors)
            errors.forEach((error: any) => console.error(error))
            setErrors(errors)
        })
        return () => {
            socket.off('message');
            socket.off('error');
        };
    }, []);

    const handleSubmit = (e: any) => {
        e.preventDefault()
        // Send a message to the specified user ID
        // @ts-ignore
        if(socket){
            socket?.emit('message', {to: userId, content: message})
            setMessage('')
        }
    }

    const handleClose = () => {
        setErrors((prevState) => prevState.splice(1))
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="max-w-md w-full space-y-8">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Send a message
                </h2>
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <input type="hidden" name="remember" defaultValue="true"/>
                    <div className="h-80 rounded-md shadow-sm -space-y-px">
                        {/*<div>*/}
                        {/*    <label htmlFor="email" className="sr-only">*/}
                        {/*        User Id*/}
                        {/*    </label>*/}
                        {/*    <input*/}
                        {/*        id="userid"*/}
                        {/*        name="userid"*/}
                        {/*        type="text"*/}
                        {/*        autoComplete="userid"*/}
                        {/*        required*/}
                        {/*        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"*/}
                        {/*        placeholder="User ID"*/}
                        {/*        value={userId}*/}
                        {/*        onChange={(e) => setUserId(e.target.value)}*/}
                        {/*    />*/}
                        {/*</div>*/}
                        <div>
                            <textarea
                                id="message"
                                name="message"
                                autoComplete="message"
                                required
                                className="h-80 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm align-text-top"
                                placeholder="Message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Send
                        </button>
                    </div>
                </form>
            </div>
            <div className="max-w-md w-full space-y-8" style={{
                height: "483px"
            }}>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Messages
                </h2>
                <div
                    className="bg-white h-80 appearance-none relative block w-full mx-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm align-text-top overflow-scroll"
                >
                    {
                        messages.map((message, i) => {
                            const justify = message.from === userId ? 'justify-end' : 'justify-start';
                            return (
                                <div key={i} className={`${justify} flex w-full`}>
                                    <div className={`bg-blue-300 p-2 rounded-md w-fit m-2`}>
                                        <p>{message.content}</p>
                                    </div>
                                </div>)
                        })
                    }
                </div>
            </div>
            <Snackbar open={!!errors.length} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {errors[0]}
                </Alert>
            </Snackbar>
        </div>
    )
}

'use client'
import React, {useState} from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';



export default function Home() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const router = useRouter();


    const handleSubmit = async (e: any) => {
        e.preventDefault()

        // Send the form data to the API endpoint
        const response = await axios.post('http://localhost:8080/api/auth/login', {
            email: email,
            username: username,
            password: password
        })
        // Handle the response to save the JWT token
        if (response.status === 200) {
            const { token } = await response.data
            console.log(response.data)
            console.log(token)
            const id = email !== "nachoferrari2000@gmail.com" ? "a609e02b-6d6d-4790-9a37-ba069636d635" : "676b86e8-f2fd-4394-a5c9-16ea8013c31a"
            await router.push(`/messaging/${id}`)
            localStorage.setItem('token', token) // Write the token to local storage
            localStorage.setItem('username', username) // Write the token to local storage
        } else {
            console.error('Login failed')
        }
    }


    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Log in to your account
                    </h2>
                </div>
                <form action="/api/form" method="post" onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <input type="hidden" name="remember" defaultValue="true"/>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <input
                                id="email"
                                name="email"
                                type="text"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember_me"
                                name="remember_me"
                                type="checkbox"
                                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                            />
                            <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Forgot your password?
                            </a>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

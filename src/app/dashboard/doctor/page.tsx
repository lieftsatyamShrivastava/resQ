"use client";

import React from "react";
import { useEffect } from "react";
import io from "Socket.IO-client";
let socket: WebSocket;

// function Chatter() {
//     async function socketInitializer() {
//         await fetch("/api/socket");
//         socket = io();
//         socket.on("connect", () => {
//             console.log("connected");
//         });
//     }
//     useEffect(() => {
//         const intervalId = setInterval(() => {
//             socketInitializer();
//         }, 1000);

//         // This function will be called when the component unmounts
//         return () => {
//             clearInterval(intervalId);
//         };
//     }, []);

//     return null;
// }

function Chatter() {
    function socketInitializer() {
        socket = new WebSocket("ws://10.10.20.118:8182/ws/chat/");

        socket.onopen = () => {
            console.log("connected");
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log(data);
        };

        socket.onerror = (error) => {
            console.log("WebSocket error: ", error);
        };

        socket.onclose = () => {
            console.log("disconnected");
        };
    }
    useEffect(() => {
        const intervalId = setInterval(() => {
            socketInitializer();
        }, 1000);

        // This function will be called when the component unmounts
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return null;
}

function page() {
    return (
        <div className="w-full p-10 bg-slate-900 h-[85vh] w-5/12">
            {Chatter()}
            <div className="flex flex-col justify-end h-full bg-slate-950 w-full rounded-3xl p-5">
                <div className="chat chat-start">
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS chat bubble component"
                                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                            />
                        </div>
                    </div>
                    <div className="chat-header">
                        Obi-Wan Kenobi
                        <time className="text-xs opacity-50">12:45</time>
                    </div>
                    <div className="chat-bubble">You were the Chosen One!</div>
                    <div className="chat-footer opacity-50">Delivered</div>
                </div>
                <div className="chat chat-end">
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS chat bubble component"
                                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                            />
                        </div>
                    </div>
                    <div className="chat-header">
                        Anakin
                        <time className="text-xs opacity-50">12:46</time>
                    </div>
                    <div className="chat-bubble">I hate you!</div>
                    <div className="chat-footer opacity-50">Seen at 12:46</div>
                </div>
                <div className="chat chat-end">
                    <div className="chat-image avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS chat bubble component"
                                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                            />
                        </div>
                    </div>
                    <div className="chat-header">
                        <time className="text-xs opacity-50">12:46</time>
                    </div>
                    <div className="chat-bubble">I hate you!</div>
                    <div className="chat-footer opacity-50">Seen at 12:46</div>
                </div>
                <div className="w-full h-fit max-h-36 overflow-y-auto flex items-center justify-center p-3">
                    <textarea
                        placeholder="Ask your Query..."
                        className="p-6 py-3 textarea textarea-bordered textarea-xs w-full text-lg"
                    ></textarea>
                </div>
            </div>
        </div>
    );
}

export default page;

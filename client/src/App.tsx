import { FC, useState, useEffect, FormEvent } from 'react';
import { io } from 'socket.io-client';

import './App.css';
const socket = io('http://localhost:5001');

interface IMessageDto {
    username: string;
    message: string;
}

const App: FC = () => {
    const [username, setUsername] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [chat, setChat] = useState<string>('');

    useEffect(() => {
        socket.on('receive_message', (data: IMessageDto) => {
            setChat((state) => `${state}${data.username}: ${data.message}\n`);
        });
    }, []);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (message.length === 0) return;

        socket.emit('new_message', { username, message });
        setChat((state) => `${state}${username}: ${message}\n`);
        setMessage('');
    };

    return (
        <div className="container">
            <h1 className="title">Welcome to Messenger</h1>

            <textarea
                className="chat"
                name="chat"
                cols={50}
                rows={10}
                disabled
                value={chat}
            ></textarea>

            <form className="message-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    className="username"
                    placeholder="Enter your username..."
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
                <textarea
                    name="message"
                    className="message"
                    cols={53}
                    rows={5}
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Enter your message..."
                ></textarea>
                <button className="send-message-btn">Send Message</button>
            </form>
        </div>
    );
};

export default App;

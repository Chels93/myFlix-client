import { useState } from "react";

export const LoginView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (event) => {
        event.preventDefault();
        
        const data = {
            access: username,
            secret: password
        };

        fetch("https://mymoviesdb-6c5720b5bef1.herokuapp.com/login"), {
            method: "POST",
            body: JSON.stringify(data)
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username: 
                <input 
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)} 
                />
            </label>
            <label>
                Password: 
                <input type="password" />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};
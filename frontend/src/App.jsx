import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!username || !message) {
      alert('Fill both fields');
      return;
    }

    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/save`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, message }),
    });

    const data = await res.json();

    if (res.ok) {
      navigate(`/home/${username}`);
    } else {
      alert('Error: ' + data.msg);
    }
  };

  return (
    <div>
      <h2>Send a message</h2>
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Enter message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default App;

import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Home() {
  const { username } = useParams();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchMessage = async () => {
      const res = await fetch(`http://localhost:3001/api/message/${username}`);
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
      } else {
        setMessage('No message found.');
      }
    };

    fetchMessage();
  }, [username]);

  return (
    <div>
      <h2>Welcome, {username}</h2>
      <p>Your message: {message}</p>
    </div>
  );
}

export default Home;

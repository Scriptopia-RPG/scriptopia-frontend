'use client';
import { useEffect, useState } from 'react';

const Home = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/test')
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  return (
    <div>
      <h1>Hello</h1>
      {data ? <pre>{JSON.stringify(data)}</pre> : <p>Loading...</p>}
    </div>
  );
};

export default Home;

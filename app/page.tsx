import Link from 'next/link';

const Home = () => {
  return (
    <div>
      <Link href="/auth/login"> 로그인 </Link>
      <Link href={'/explore'}>탐색</Link>
    </div>
  );
};

export default Home;

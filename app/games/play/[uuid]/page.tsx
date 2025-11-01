import { use } from 'react';

interface PageProps {
  params: Promise<{ uuid: string }>;
}

const Page = ({ params }: PageProps) => {
  const { uuid } = use(params);

  return <div>Play Game {uuid}</div>;
};

export default Page;

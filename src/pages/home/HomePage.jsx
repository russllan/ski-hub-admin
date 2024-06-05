import React from 'react';
import { useManyBases } from "../../hooks/useBase";
import ReviewCard from "../../components/reviewCard/ReviewCard";
import { Link, useLocation } from 'react-router-dom';

export default function HomePage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const filter = searchParams.get('filter');

  const { data, isPending, isLoading } = useManyBases();

  if (isLoading) return <h1>Loading...</h1>;
  return (
    <div className="h-screen w-full">
      <header>
        <Link to="?filter=mytours">Мои туры</Link>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data?.map((item) => (
          <ReviewCard key={item.id} item={item} {...item} />
        ))}
      </div>
    </div>
  );
}

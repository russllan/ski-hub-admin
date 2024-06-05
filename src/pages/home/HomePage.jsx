import React, { useEffect, useState } from 'react';
import { useManyBases } from "../../hooks/useBase";
import ReviewCard from "../../components/reviewCard/ReviewCard";
import EditBaseModal from "../../components/editBaseModal";
import { Link, useLocation } from 'react-router-dom';
import $api from '../../services';
import { toast } from 'react-toastify';

export default function HomePage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const filter = searchParams.get('filter');

  const { data, isPending, isLoading } = useManyBases();
  const [adminBases, setBases] = useState([]);
  const [selectedBase, setSelectedBase] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getMineBases = async () => {
    try {
      const res = await $api.get("/bases/adminGet");
      setBases(res.data);
    } catch (e) {
      toast.error("No Tours you have yet");
    }
  };


  const handleEditClick = (base) => {
    setSelectedBase(base);
    setIsModalOpen(true);
  };

  useEffect(() => {
    getMineBases();
  }, []);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="h-screen w-full p-4">
      {/* <header className="mb-4">
        <Link to="?filter=mytours" className="text-blue-500 underline">Мои туры</Link>
      </header> */}
      <h1 className="text-2xl font-bold mb-4">Ваши базы</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {adminBases.map((item) => (
          <div key={item.id} className="relative" onClick={() => handleEditClick(item)}>
            <ReviewCard {...item} />
          </div>
        ))}
      </div>
      {selectedBase && (
        <EditBaseModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          base={selectedBase}
          onUpdate={getMineBases}
        />
      )}
      <h1 className="text-2xl font-bold mb-4">Все базы</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {data?.map((item) => (
          <ReviewCard key={item.id} {...item} />
        ))}
      </div>

    </div>
  );
}

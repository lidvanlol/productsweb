'use client'
import { useEffect, useState } from 'react';
import ProductGrid from '@/components/ProductGrid';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://fakestoreapi.com/products?limit=${page * 4}`);
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
    setLoading(false);
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  const { observerTarget } = useInfiniteScroll(loadMore);

  useEffect(() => {
    fetchProducts();
  }, [page]);

  return (
    <main className="container mx-auto px-4">
      <ProductGrid products={products} />
      {loading && <div className="text-center py-4">Loading...</div>}
      <div ref={observerTarget} />
    </main>
  );
}
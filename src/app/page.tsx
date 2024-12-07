"use client";
import { useEffect, useState, useMemo } from "react";
import ProductGrid from "@/components/ProductGrid";
import SortControls from "@/components/SortControls";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import { Product, SortOrder } from "@/types/product";
const ITEMS_PER_PAGE = 4;

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Fetch categories
  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((res) => res.json())
      .then(setCategories);
  }, []);

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const url = selectedCategory
        ? `https://fakestoreapi.com/products/category/${selectedCategory}`
        : "https://fakestoreapi.com/products";

      // Add smaller timeout to prevent loading flash
      await new Promise((resolve) => setTimeout(resolve, 300));

      const res = await fetch(url);
      const data = await res.json();
      setProducts(data);
      setDisplayedProducts(data.slice(0, ITEMS_PER_PAGE));
      setHasMore(data.length > ITEMS_PER_PAGE);
    } catch (error) {
      console.error("Error:", error);
      setHasMore(false);
    }
    setLoading(false);
  };

  // Initial fetch and category change
  useEffect(() => {
    setPage(1);
    fetchProducts();
  }, [selectedCategory]);

  // Load more products
  const loadMore = () => {
    if (!loading && hasMore) {
      const nextItems = products.slice(0, (page + 1) * ITEMS_PER_PAGE);
      setDisplayedProducts(nextItems);
      setPage((prev) => prev + 1);
      setHasMore(nextItems.length < products.length);
    }
  };

  const { observerTarget } = useInfiniteScroll(loadMore);

  const sortedProducts = useMemo(() => {
    return [...displayedProducts].sort((a, b) => {
      return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
    });
  }, [displayedProducts, sortOrder]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setPage(1);
    setDisplayedProducts([]);
    setHasMore(true);
  };

  return (
    <main className="container mx-auto px-4">
      <SortControls
        categories={categories}
        selectedCategory={selectedCategory}
        sortOrder={sortOrder}
        onCategoryChange={handleCategoryChange}
        onSortChange={setSortOrder}
      />

      <ProductGrid products={sortedProducts} loading={loading} />

      {!loading && !hasMore && sortedProducts.length > 0 && (
        <div className="text-center py-6 text-gray-500 border-t">
          No more products to load
        </div>
      )}

      {hasMore && <div ref={observerTarget} className="h-10" />}
    </main>
  );
}

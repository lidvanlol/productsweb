import Link from "next/link";
import { Product } from "@/types/product";
import ProductImage from "./ProductImage";

interface ProductGridProps {
  products: Product[];
  loading: boolean;
}

export default function ProductGrid({ products, loading }: ProductGridProps) {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8">
        {loading && !products.length
          ? // Loading skeletons
            Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-sm p-4 animate-pulse"
              >
                <div className="relative w-full aspect-square bg-gray-200 rounded-lg mb-4" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/4" />
              </div>
            ))
          : products.map((product) => (
              <Link
                href={`/products/${product.id}`}
                key={product.id}
                className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                <div className="p-4">
                  <div className="relative w-full aspect-square bg-white rounded-lg">
                    <ProductImage
                      src={product.image}
                      alt={product.title}
                      width={400}
                      height={400}
                    />
                  </div>
                  <div className="space-y-2 mt-4">
                    <h3 className="text-sm font-medium text-gray-800 line-clamp-2 min-h-[40px] text-center">
                      {product.title}
                    </h3>
                    <p className="text-lg font-bold text-blue-700 text-center">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
      </div>
      {loading && products.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-sm p-4 animate-pulse"
            >
              <div className="relative w-full aspect-square bg-gray-200 rounded-lg mb-4" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-1/4" />
            </div>
          ))}
        </div>
      )}
    </>
  );
}

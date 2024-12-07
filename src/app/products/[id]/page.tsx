import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface ProductPageProps {
  params: {
    id: string;
  };
}

// Generate metadata
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(params.id);

  return {
    title: product?.title || "Product Not Found",
    description: product?.description || "Product details",
  };
}

async function getProduct(id: string) {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return null;
    }

    return res.json();
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export default async function ProductPage(props: ProductPageProps) {
  const { params } = props;
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 bg-white rounded-xl shadow-sm p-6">
          {/* Product Image */}
          <div className="relative aspect-square bg-white rounded-lg">
            <Image
              src={product.image}
              alt={product.title}
              width={500}
              height={500}
              className="object-contain w-full h-full"
              priority
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              {product.title}
            </h1>

            <div className="flex items-center gap-4 mb-6">
              <p className="text-3xl font-bold text-blue-600">
                ${product.price.toFixed(2)}
              </p>
              <div className="flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-full">
                <span className="text-yellow-500">★</span>
                <span className="text-blue-600 font-medium">
                  {product.rating.rate}
                </span>
                <span className="text-gray-500">
                  ({product.rating.count} reviews)
                </span>
              </div>
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">
              {product.description}
            </p>

            <div className="mt-auto">
              <div className="mb-4">
                <span className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                  Category: {product.category}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

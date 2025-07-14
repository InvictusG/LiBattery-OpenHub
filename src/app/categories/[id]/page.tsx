import { notFound } from 'next/navigation';
import CategoryClientPage from './CategoryClientPage';
import { Metadata } from 'next';
import { categories } from '@/lib/categories'; // Use the new single source of truth for categories

export async function generateStaticParams() {
  return categories.map((category) => ({
    id: category.id.toLowerCase(),
  }));
}

export async function generateMetadata({ params }: { params: { id:string } }): Promise<Metadata> {
  const category = categories.find(cat => cat.id.toLowerCase() === params.id.toLowerCase());
  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }
  return {
    title: `${category.name} | LiBattery OpenHub`,
    description: category.description,
  }
}

export default function CategoryDetailPage({ params }: { params: { id: string } }) {
  const categoryId = params.id;
  const category = categories.find(cat => cat.id.toLowerCase() === categoryId.toLowerCase());

  if (!category) {
    notFound();
  }

  return <CategoryClientPage category={category} />;
} 
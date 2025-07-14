import { mockCategories, mockRepositories } from '@/lib/mock-data';
import { notFound } from 'next/navigation';
import CategoryClientPage from './CategoryClientPage'; // Import the new client component
import { Metadata } from 'next';

// This function generates the static paths for each category at build time
export async function generateStaticParams() {
  return mockCategories.map((category) => ({
    id: category.id,
  }));
}

// This function generates the metadata for the page head
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const category = mockCategories.find(cat => cat.id.toLowerCase() === params.id.toLowerCase());
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

// This is the main Server Component for the page
export default function CategoryDetailPage({ params }: { params: { id: string } }) {
  const categoryId = params.id;
  const category = mockCategories.find(cat => cat.id.toLowerCase() === categoryId.toLowerCase());

  if (!category) {
    notFound();
  }

  // Filter projects for the current category on the server
  const initialProjects = mockRepositories.filter(
    repo => repo.category.toLowerCase() === categoryId.toLowerCase()
  );

  return <CategoryClientPage category={category} initialProjects={initialProjects} />;
} 
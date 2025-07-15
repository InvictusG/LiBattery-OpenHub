import { Metadata } from 'next';
import CategoriesClientPage from './CategoriesClientPage';

export const metadata: Metadata = {
  title: 'All Categories | LiBattery OpenHub',
  description: 'Explore all technical categories for open-source lithium battery projects, from BMS to materials science.',
};

export default function CategoriesPage() {
  return <CategoriesClientPage />;
} 
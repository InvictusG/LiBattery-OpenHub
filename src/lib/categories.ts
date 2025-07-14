import { Category } from '@/types';

// This data is now the single source of truth for categories until a dynamic source is implemented.
export const categories: Category[] = [
  { id: 'bms', name: 'Battery Management System (BMS)', description: 'Projects related to managing and monitoring battery packs.', repositories: 0 },
  { id: 'cell_design', name: 'Cell Design & Simulation', description: 'Tools for designing and simulating battery cells.', repositories: 0 },
  { id: 'materials', name: 'Materials Science', description: 'Research and data on battery materials.', repositories: 0 },
  { id: 'recycling', name: 'Recycling & Sustainability', description: 'Initiatives for recycling and sustainable battery lifecycles.', repositories: 0 },
  { id: 'testing', name: 'Testing & Analytics', description: 'Software and hardware for testing battery performance.', repositories: 0 },
  { id: 'pack_manufacturing', name: 'Pack Manufacturing', description: 'Projects focused on the manufacturing process of battery packs.', repositories: 0 },
  { id: 'life_prediction', name: 'Life Prediction', description: 'Models and tools for predicting battery lifespan.', repositories: 0 },
  { id: 'simulation', name: 'Simulation', description: 'Software for simulating battery behavior and performance.', repositories: 0 },
  { id: 'thermal', name: 'Thermal Management', description: 'Solutions for managing heat in battery systems.', repositories: 0 },
  { id: 'safety', name: 'Safety', description: 'Projects focused on battery safety and hazard prevention.', repositories: 0 },
  { id: 'manufacturing', name: 'Manufacturing', description: 'Technologies and processes for battery manufacturing.', repositories: 0 },
  { id: 'data_analysis', name: 'Data Analysis', description: 'Tools and algorithms for analyzing battery data.', repositories: 0 },
  { id: 'modeling', name: 'Modeling', description: 'Mathematical and physical modeling of batteries.', repositories: 0 },
  { id: 'optimization', name: 'Optimization', description: 'Algorithms for optimizing battery performance and usage.', repositories: 0 },
  { id: 'other', name: 'Other', description: 'Miscellaneous projects related to battery technology.', repositories: 0 },
]; 
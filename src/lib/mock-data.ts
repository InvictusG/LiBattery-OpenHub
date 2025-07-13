import type { Repository, Category } from '@/types';

export const mockRepositories: Repository[] = [
  { id: 1, name: 'BMS-Master', stars: 1500, forks: 300, description: 'An advanced Battery Management System for Li-ion.', category: 'BMS', url: '#', owner: 'bms-community', ownerUrl: '#', lastUpdate: '2023-10-01', topics: ['bms', 'li-ion', 'embedded'] },
  { id: 2, name: 'Li-Ion-Simulator', stars: 800, forks: 150, description: 'A Python-based simulator for lithium-ion battery cells.', category: 'CELL_DESIGN', url: '#', owner: 'pybamm', ownerUrl: '#', lastUpdate: '2023-09-15', topics: ['python', 'simulation', 'electrochemistry'] },
  { id: 3, name: 'Electrolyte-DB', stars: 450, forks: 90, description: 'A database of electrolyte properties for battery research.', category: 'MATERIALS', url: '#', owner: 'e-chem', ownerUrl: '#', lastUpdate: '2023-11-05', topics: ['database', 'materials-science', 'electrochemistry'] },
  { id: 4, name: 'Battery-Recycle-Net', stars: 600, forks: 120, description: 'Deep learning models for identifying recyclable battery components.', category: 'RECYCLING', url: '#', owner: 'recycle-ai', ownerUrl: '#', lastUpdate: '2023-10-22', topics: ['deep-learning', 'recycling', 'sustainability'] },
  { id: 5, name: 'Open-BMS-Firmware', stars: 1200, forks: 250, description: 'Open source firmware for various BMS hardware.', category: 'BMS', url: '#', owner: 'open-bms', ownerUrl: '#', lastUpdate: '2023-11-10', topics: ['firmware', 'bms', 'c++'] },
  { id: 6, name: 'Cell-Analyzer', stars: 300, forks: 75, description: 'Tools for analyzing battery cell test data.', category: 'TESTING', url: '#', owner: 'cell-gurus', ownerUrl: '#', lastUpdate: '2023-08-30', topics: ['testing', 'data-analysis', 'python'] },
];

export const mockCategories: Category[] = [
    { id: 'BMS', name: 'Battery Management System (BMS)', description: 'Projects related to managing and monitoring battery packs.', repositories: 2 },
    { id: 'CELL_DESIGN', name: 'Cell Design & Simulation', description: 'Tools for designing and simulating battery cells.', repositories: 1 },
    { id: 'MATERIALS', name: 'Materials Science', description: 'Research and data on battery materials.', repositories: 1 },
    { id: 'RECYCLING', name: 'Recycling & Sustainability', description: 'Initiatives for recycling and sustainable battery lifecycles.', repositories: 1 },
    { id: 'TESTING', name: 'Testing & Analytics', description: 'Software and hardware for testing battery performance.', repositories: 1 },
    { id: 'PACK_MANUFACTURING', name: 'Pack Manufacturing', description: 'Projects focused on the manufacturing process of battery packs.', repositories: 0 },
]; 
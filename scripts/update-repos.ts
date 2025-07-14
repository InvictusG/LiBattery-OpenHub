// scripts/update-repos.ts
import { Octokit } from "@octokit/rest";
import fs from "fs/promises";
import path from "path";
import { format } from "prettier";
import 'dotenv/config'; // To load .env file

// --- CONFIGURATION ---
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
if (!GITHUB_TOKEN) {
  throw new Error("GitHub token not found. Please set GITHUB_TOKEN in your .env file.");
}

const octokit = new Octokit({ auth: GITHUB_TOKEN });

const SEARCH_QUERIES = [
  'topic:lithium-ion-battery',
  'topic:battery-management-system',
  'topic:bms',
  'topic:battery-simulation',
  'topic:solid-state-battery',
  'battery modeling language:python',
  'battery analytics language:python',
  'electrochemical impedance spectroscopy',
];

const MOCK_DATA_PATH = path.join(process.cwd(), 'src', 'lib', 'mock-data.ts');
const MAX_REPOS = 50; // Max number of repositories to fetch and store

// --- TYPES (should match src/types/index.ts) ---
interface Repository {
  id: number;
  name: string;
  owner: string;
  ownerUrl: string;
  description: string;
  url: string;
  stars: number;
  forks: number;
  lastUpdate: string;
  category: string;
  topics: string[];
}

interface Category {
    id: string;
    name: string;
    description: string;
    repositories: number;
}


// --- HELPER FUNCTIONS ---

/**
 * Assigns a category based on repository topics, name, or description.
 * This is a simple heuristic and can be expanded.
 */
function assignCategory(repo: any): string {
    const searchText = `${repo.name.toLowerCase()} ${repo.description?.toLowerCase() ?? ''} ${(repo.topics ?? []).join(' ')}`;
    if (searchText.includes('bms') || searchText.includes('battery management')) return 'BMS';
    if (searchText.includes('simulation') || searchText.includes('modeling') || searchText.includes('design')) return 'CELL_DESIGN';
    if (searchText.includes('material') || searchText.includes('electrolyte') || searchText.includes('cathode')) return 'MATERIALS';
    if (searchText.includes('recycling') || searchText.includes('second-life')) return 'RECYCLING';
    if (searchText.includes('test') || searchText.includes('analysis') || searchText.includes('impedance') || searchText.includes('characterization')) return 'TESTING';
    if (searchText.includes('pack') || searchText.includes('manufacturing')) return 'PACK_MANUFACTURING';
    return 'BMS'; // Default category
}

/**
 * Fetches repositories from GitHub based on a list of queries.
 */
async function fetchRepositories(): Promise<Repository[]> {
  console.log("Fetching repositories from GitHub...");
  const allRepos = new Map<number, any>();

  for (const q of SEARCH_QUERIES) {
    try {
        const { data } = await octokit.search.repos({
            q,
            sort: 'stars',
            order: 'desc',
            per_page: 50,
        });
        console.log(`Found ${data.items.length} repos for query: "${q}"`);
        for (const item of data.items) {
            if (!allRepos.has(item.id)) {
                allRepos.set(item.id, item);
            }
        }
    } catch(error) {
        console.error(`Error fetching for query "${q}":`, error);
    }
  }

  const sortedRepos = Array.from(allRepos.values()).sort((a, b) => b.stargazers_count - a.stargazers_count);
  console.log(`Total unique repositories found: ${sortedRepos.length}`);

  const formattedRepos: Repository[] = sortedRepos.slice(0, MAX_REPOS).map(repo => ({
    id: repo.id,
    name: repo.name,
    owner: repo.owner.login,
    ownerUrl: repo.owner.html_url,
    description: repo.description || 'No description provided.',
    url: repo.html_url,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    lastUpdate: repo.updated_at.split('T')[0],
    category: assignCategory(repo),
    topics: repo.topics || [],
  }));

  return formattedRepos;
}

/**
 * Generates the content for the mock-data.ts file.
 */
async function generateMockFileContent(repositories: Repository[]): Promise<string> {
    const categories: Category[] = [
        { id: 'BMS', name: 'Battery Management System (BMS)', description: 'Projects related to managing and monitoring battery packs.', repositories: 0 },
        { id: 'CELL_DESIGN', name: 'Cell Design & Simulation', description: 'Tools for designing and simulating battery cells.', repositories: 0 },
        { id: 'MATERIALS', name: 'Materials Science', description: 'Research and data on battery materials.', repositories: 0 },
        { id: 'RECYCLING', name: 'Recycling & Sustainability', description: 'Initiatives for recycling and sustainable battery lifecycles.', repositories: 0 },
        { id: 'TESTING', name: 'Testing & Analytics', description: 'Software and hardware for testing battery performance.', repositories: 0 },
        { id: 'PACK_MANUFACTURING', name: 'Pack Manufacturing', description: 'Projects focused on the manufacturing process of battery packs.', repositories: 0 },
    ];

    const categoryMap = new Map<string, number>();
    repositories.forEach(repo => {
        categoryMap.set(repo.category, (categoryMap.get(repo.category) || 0) + 1);
    });

    categories.forEach(cat => {
        cat.repositories = categoryMap.get(cat.id) || 0;
    });

  const content = `
    // This file is auto-generated by scripts/update-repos.ts. Do not edit manually.
    import type { Repository, Category } from '@/types';

    export const mockRepositories: Repository[] = ${JSON.stringify(repositories, null, 2)};

    export const mockCategories: Category[] = ${JSON.stringify(categories, null, 2)};
  `;
  
  const prettierConfig = await import('../.prettierrc.json');
  return format(content, { parser: 'typescript', ...prettierConfig });
}

// --- MAIN EXECUTION ---

async function main() {
  try {
    const repos = await fetchRepositories();
    console.log(`Successfully fetched ${repos.length} repositories.`);

    const fileContent = await generateMockFileContent(repos);
    await fs.writeFile(MOCK_DATA_PATH, fileContent, 'utf-8');
    console.log(`Successfully updated ${MOCK_DATA_PATH}`);
  } catch (error) {
    console.error("Failed to update repositories:", error);
    process.exit(1);
  }
}

main(); 
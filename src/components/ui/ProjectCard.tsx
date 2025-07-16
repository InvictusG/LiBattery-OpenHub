"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Star, GitFork, ExternalLink, Tag, Scale } from "lucide-react";
import { Repository } from "@/types";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  repo: any;
  index?: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ repo, index = 0 }) => {
  const languageColor = getLanguageColor(repo.language);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.05,
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  if (!repo) {
    return null;
  }

  const ownerLogin = repo.owner?.login || '未知所有者';
  const ownerAvatar = repo.owner?.avatar_url || 'https://github.com/github.png';
  const repoName = repo.name || '未知项目';
  const repoDescription = repo.description || '暂无描述。';
  const repoUrl = repo.html_url || '#';
  const stars = repo.stargazers_count ?? 0;
  const forks = repo.forks_count ?? repo.forks ?? 0;
  const language = repo.language || '未知';
  const licenseName = repo.license?.name || '无许可证';

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      viewport={{ once: true }}
      className={cn(
        "bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out flex flex-col h-full overflow-hidden"
      )}
    >
      <div className="p-6 flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <img src={ownerAvatar} alt={`${ownerLogin} 的头像`} className="w-10 h-10 rounded-full border-2 border-slate-200 dark:border-slate-700" />
            <div>
              <h3 className="text-sm font-semibold text-blue-600 dark:text-blue-400 truncate">
                {ownerLogin}
              </h3>
              <a href={repoUrl} target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-slate-800 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {repoName}
              </a>
            </div>
          </div>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 h-10 overflow-hidden">
          {repoDescription}
        </p>
      </div>
      
      <div className="bg-slate-50 dark:bg-slate-800/50 px-6 py-4 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5" title="语言">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: languageColor }}></div>
            <span>{language}</span>
          </div>
          <div className="flex items-center gap-1" title="Stars">
            <Star className="w-3.5 h-3.5 text-yellow-500" />
            <span>{stars.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1" title="Forks">
            <GitFork className="w-3.5 h-3.5 text-green-500" />
            <span>{forks.toLocaleString()}</span>
          </div>
        </div>
        <div className="flex items-center gap-1" title="许可证">
          <Scale className="w-3.5 h-3.5" />
          <span>{licenseName}</span>
        </div>
      </div>
    </motion.div>
  );
};

const languageColors: { [key: string]: string } = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  Go: "#00ADD8",
  Rust: "#dea584",
  "C++": "#f34b7d",
  C: "#555555",
  Shell: "#89e051",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Ruby: "#701516",
  PHP: "#4F5D95",
  Vue: "#41b883",
  Svelte: "#ff3e00",
  default: "#6e7681",
};

const getLanguageColor = (language: string | null): string => {
  if (language && languageColors[language]) {
    return languageColors[language];
  }
  return languageColors.default;
}; 
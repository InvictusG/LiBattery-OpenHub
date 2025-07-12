import { Octokit } from '@octokit/rest'
import { GitHubSearchResponse, GitHubRepository } from '@/types'

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
})

export class GitHubService {
  /**
   * 搜索与锂离子电池相关的仓库
   */
  static async searchBatteryRepositories(
    query: string = '',
    page: number = 1,
    perPage: number = 30
  ): Promise<GitHubSearchResponse> {
    try {
      // 构建搜索查询
      const batteryKeywords = [
        'lithium-ion battery',
        'battery management system',
        'BMS',
        'battery modeling',
        'battery simulation',
        'electrochemistry',
        'battery data',
        'battery prediction',
        'battery thermal',
        'battery safety',
        'battery materials',
        'battery testing',
        'battery optimization',
        'battery life',
        'battery capacity',
        'battery charging',
        'battery discharge',
        'battery degradation',
        'battery SOC',
        'battery SOH',
      ]

      let searchQuery = query
      if (!query) {
        // 如果没有特定查询，使用电池相关关键词
        searchQuery = batteryKeywords.slice(0, 5).join(' OR ')
      } else {
        // 如果有查询，添加电池相关过滤
        searchQuery = `${query} AND (${batteryKeywords.slice(0, 3).join(' OR ')})`
      }

      // 添加其他过滤条件
      searchQuery += ' fork:false archived:false'

      const response = await octokit.rest.search.repos({
        q: searchQuery,
        sort: 'stars',
        order: 'desc',
        page,
        per_page: perPage,
      })

      return response.data
    } catch (error) {
      console.error('GitHub API Error:', error)
      throw new Error('Failed to search GitHub repositories')
    }
  }

  /**
   * 获取特定仓库的详细信息
   */
  static async getRepository(owner: string, repo: string): Promise<GitHubRepository> {
    try {
      const response = await octokit.rest.repos.get({
        owner,
        repo,
      })
      return response.data
    } catch (error) {
      console.error('GitHub API Error:', error)
      throw new Error('Failed to get repository details')
    }
  }

  /**
   * 获取仓库的 README 内容
   */
  static async getRepositoryReadme(owner: string, repo: string): Promise<string | null> {
    try {
      const response = await octokit.rest.repos.getReadme({
        owner,
        repo,
      })
      
      if (response.data.content) {
        return Buffer.from(response.data.content, 'base64').toString('utf8')
      }
      return null
    } catch (error) {
      console.error('Failed to get README:', error)
      return null
    }
  }

  /**
   * 获取仓库的贡献者列表
   */
  static async getRepositoryContributors(owner: string, repo: string) {
    try {
      const response = await octokit.rest.repos.listContributors({
        owner,
        repo,
        per_page: 10,
      })
      return response.data
    } catch (error) {
      console.error('Failed to get contributors:', error)
      return []
    }
  }

  /**
   * 获取仓库的发布版本
   */
  static async getRepositoryReleases(owner: string, repo: string) {
    try {
      const response = await octokit.rest.repos.listReleases({
        owner,
        repo,
        per_page: 5,
      })
      return response.data
    } catch (error) {
      console.error('Failed to get releases:', error)
      return []
    }
  }

  /**
   * 获取仓库的语言统计
   */
  static async getRepositoryLanguages(owner: string, repo: string) {
    try {
      const response = await octokit.rest.repos.listLanguages({
        owner,
        repo,
      })
      return response.data
    } catch (error) {
      console.error('Failed to get languages:', error)
      return {}
    }
  }

  /**
   * 获取仓库的主题标签
   */
  static async getRepositoryTopics(owner: string, repo: string) {
    try {
      const response = await octokit.rest.repos.getAllTopics({
        owner,
        repo,
      })
      return response.data.names
    } catch (error) {
      console.error('Failed to get topics:', error)
      return []
    }
  }

  /**
   * 检查 API 速率限制
   */
  static async getRateLimit() {
    try {
      const response = await octokit.rest.rateLimit.get()
      return response.data
    } catch (error) {
      console.error('Failed to get rate limit:', error)
      return null
    }
  }

  /**
   * 搜索特定类别的电池相关仓库
   */
  static async searchBatteryRepositoriesByCategory(
    category: string,
    page: number = 1,
    perPage: number = 20
  ): Promise<GitHubSearchResponse> {
    const categoryKeywords: Record<string, string[]> = {
      'cell_design': ['battery cell design', 'lithium cell', 'electrode design'],
      'life_prediction': ['battery life prediction', 'battery degradation', 'SOH prediction'],
      'bms': ['battery management system', 'BMS', 'battery monitoring'],
      'simulation': ['battery simulation', 'battery modeling', 'electrochemical model'],
      'thermal': ['battery thermal', 'thermal management', 'battery cooling'],
      'safety': ['battery safety', 'thermal runaway', 'battery protection'],
      'materials': ['battery materials', 'electrode materials', 'electrolyte'],
      'manufacturing': ['battery manufacturing', 'battery production', 'battery assembly'],
      'testing': ['battery testing', 'battery characterization', 'battery analysis'],
      'data_analysis': ['battery data analysis', 'battery analytics', 'battery machine learning'],
      'modeling': ['battery modeling', 'electrochemical modeling', 'battery simulation'],
      'optimization': ['battery optimization', 'battery control', 'battery algorithm'],
    }

    const keywords = categoryKeywords[category] || ['lithium-ion battery']
    const searchQuery = `(${keywords.join(' OR ')}) fork:false archived:false`

    try {
      const response = await octokit.rest.search.repos({
        q: searchQuery,
        sort: 'stars',
        order: 'desc',
        page,
        per_page: perPage,
      })

      return response.data
    } catch (error) {
      console.error('GitHub API Error:', error)
      throw new Error('Failed to search repositories by category')
    }
  }
}

export default GitHubService 
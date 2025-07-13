const mongoose = require('mongoose');
const path = require('path');

// 加载环境变量
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

// 模拟数据
const mockRepositories = [
  {
    id: 1,
    name: "PyBaMM",
    full_name: "pybamm-team/PyBaMM",
    description: "Fast and flexible physics-based battery models in Python",
    html_url: "https://github.com/pybamm-team/PyBaMM",
    clone_url: "https://github.com/pybamm-team/PyBaMM.git",
    ssh_url: "git@github.com:pybamm-team/PyBaMM.git",
    homepage: "https://www.pybamm.org",
    language: "Python",
    topics: ["battery", "modeling", "simulation", "physics"],
    stargazers_count: 850,
    watchers_count: 850,
    forks_count: 280,
    open_issues_count: 45,
    size: 15000,
    license: {
      key: "bsd-3-clause",
      name: "BSD 3-Clause \"New\" or \"Revised\" License",
      spdx_id: "BSD-3-Clause",
      url: "https://api.github.com/licenses/bsd-3-clause"
    },
    owner: {
      login: "pybamm-team",
      id: 12345,
      avatar_url: "https://avatars.githubusercontent.com/u/12345?v=4",
      html_url: "https://github.com/pybamm-team",
      type: "Organization"
    },
    created_at: "2018-06-01T10:00:00Z",
    updated_at: "2025-01-13T10:00:00Z",
    pushed_at: "2025-01-13T09:30:00Z",
    archived: false,
    disabled: false,
    visibility: "public",
    default_branch: "main",
    category: "simulation",
    relevance_score: 95,
    last_synced: new Date().toISOString()
  },
  {
    id: 2,
    name: "BEEP",
    full_name: "TRI-AMDD/beep",
    description: "Battery Evaluation and Early Prediction Software",
    html_url: "https://github.com/TRI-AMDD/beep",
    clone_url: "https://github.com/TRI-AMDD/beep.git",
    ssh_url: "git@github.com:TRI-AMDD/beep.git",
    homepage: null,
    language: "Python",
    topics: ["battery", "data-analysis", "machine-learning"],
    stargazers_count: 120,
    watchers_count: 120,
    forks_count: 45,
    open_issues_count: 8,
    size: 5000,
    license: {
      key: "apache-2.0",
      name: "Apache License 2.0",
      spdx_id: "Apache-2.0",
      url: "https://api.github.com/licenses/apache-2.0"
    },
    owner: {
      login: "TRI-AMDD",
      id: 23456,
      avatar_url: "https://avatars.githubusercontent.com/u/23456?v=4",
      html_url: "https://github.com/TRI-AMDD",
      type: "Organization"
    },
    created_at: "2019-03-15T14:30:00Z",
    updated_at: "2025-01-12T16:45:00Z",
    pushed_at: "2025-01-12T16:30:00Z",
    archived: false,
    disabled: false,
    visibility: "public",
    default_branch: "main",
    category: "data_analysis",
    relevance_score: 85,
    last_synced: new Date().toISOString()
  },
  {
    id: 3,
    name: "battery-parameter-spaces",
    full_name: "pybamm-team/battery-parameter-spaces",
    description: "A library for generating parameter spaces for battery models",
    html_url: "https://github.com/pybamm-team/battery-parameter-spaces",
    clone_url: "https://github.com/pybamm-team/battery-parameter-spaces.git",
    ssh_url: "git@github.com:pybamm-team/battery-parameter-spaces.git",
    homepage: null,
    language: "Python",
    topics: ["battery", "parameters", "modeling"],
    stargazers_count: 35,
    watchers_count: 35,
    forks_count: 12,
    open_issues_count: 3,
    size: 1200,
    license: {
      key: "mit",
      name: "MIT License",
      spdx_id: "MIT",
      url: "https://api.github.com/licenses/mit"
    },
    owner: {
      login: "pybamm-team",
      id: 12345,
      avatar_url: "https://avatars.githubusercontent.com/u/12345?v=4",
      html_url: "https://github.com/pybamm-team",
      type: "Organization"
    },
    created_at: "2020-09-10T11:20:00Z",
    updated_at: "2025-01-10T08:15:00Z",
    pushed_at: "2025-01-10T08:00:00Z",
    archived: false,
    disabled: false,
    visibility: "public",
    default_branch: "main",
    category: "modeling",
    relevance_score: 70,
    last_synced: new Date().toISOString()
  }
];

async function testDatabaseConnection() {
  try {
    console.log('🔗 测试数据库连接...');
    
    // 连接数据库
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/libattery-hub', {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    console.log('✅ 数据库连接成功');
    
    // 导入 Repository 模型
    const Repository = require('../src/lib/models/Repository.ts').default;
    
    console.log('📊 清理现有测试数据...');
    await Repository.deleteMany({ id: { $in: [1, 2, 3] } });
    
    console.log('📝 插入模拟数据...');
    for (const repo of mockRepositories) {
      await Repository.create(repo);
      console.log(`✅ 已添加: ${repo.full_name}`);
    }
    
    console.log('🔍 验证数据插入...');
    const count = await Repository.countDocuments();
    console.log(`📊 数据库中共有 ${count} 个仓库`);
    
    // 测试查询功能
    console.log('🔎 测试分类查询...');
    const simulationRepos = await Repository.find({ category: 'simulation' });
    console.log(`📈 模拟工具分类: ${simulationRepos.length} 个项目`);
    
    const dataAnalysisRepos = await Repository.find({ category: 'data_analysis' });
    console.log(`📊 数据分析分类: ${dataAnalysisRepos.length} 个项目`);
    
    // 测试搜索功能
    console.log('🔍 测试全文搜索...');
    const searchResults = await Repository.find({ $text: { $search: 'battery' } });
    console.log(`🔎 搜索 "battery": ${searchResults.length} 个结果`);
    
    console.log('✅ 数据同步测试完成！');
    
  } catch (error) {
    console.error('❌ 测试失败:', error.message);
    throw error;
  } finally {
    await mongoose.disconnect();
    console.log('🔌 数据库连接已关闭');
  }
}

// 运行测试
testDatabaseConnection()
  .then(() => {
    console.log('🎉 所有测试通过！');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 测试失败:', error);
    process.exit(1);
  }); 
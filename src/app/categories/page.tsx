'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Battery, 
  BarChart3, 
  Cpu, 
  Settings, 
  Thermometer, 
  Shield, 
  FlaskConical,
  Wrench,
  TestTube,
  Layers,
  Target,
  ArrowRight
} from 'lucide-react'

export default function CategoriesPage() {
  const categories = [
    {
      id: 'cell-design',
      name: '电芯设计与建模',
      description: '电池单体设计、电极材料优化、电化学建模等核心技术',
      icon: Battery,
      color: 'from-blue-500 to-blue-600',
      count: 156,
      trending: true,
      projects: [
        { name: 'CellSim', stars: 1234, description: '高性能电芯仿真引擎' },
        { name: 'ElectrodeDesign', stars: 890, description: '电极材料设计工具' },
        { name: 'BatteryCAD', stars: 567, description: '电池结构设计软件' }
      ]
    },
    {
      id: 'life-prediction',
      name: '电池寿命预测',
      description: '基于数据驱动和物理模型的电池寿命预测技术',
      icon: BarChart3,
      color: 'from-green-500 to-green-600',
      count: 89,
      trending: true,
      projects: [
        { name: 'BatteryML', stars: 2340, description: '机器学习寿命预测' },
        { name: 'LifeCycle', stars: 1456, description: '循环寿命分析工具' },
        { name: 'SOH-Estimator', stars: 987, description: '健康状态估计器' }
      ]
    },
    {
      id: 'bms',
      name: '电池管理系统',
      description: 'BMS硬件设计、软件算法、平衡控制等管理系统技术',
      icon: Cpu,
      color: 'from-purple-500 to-purple-600',
      count: 134,
      trending: false,
      projects: [
        { name: 'OpenBMS', stars: 1890, description: '开源电池管理系统' },
        { name: 'SmartBMS', stars: 1234, description: '智能电池管理' },
        { name: 'BMSCore', stars: 876, description: 'BMS核心算法库' }
      ]
    },
    {
      id: 'simulation',
      name: '仿真与模拟工具',
      description: '电池性能仿真、多物理场耦合、有限元分析等仿真技术',
      icon: Settings,
      color: 'from-orange-500 to-orange-600',
      count: 98,
      trending: true,
      projects: [
        { name: 'PyBaMM', stars: 1200, description: 'Python电池数学建模' },
        { name: 'LIONSIMBA', stars: 456, description: 'MATLAB仿真工具箱' },
        { name: 'BattSim', stars: 789, description: '电池仿真平台' }
      ]
    },
    {
      id: 'thermal',
      name: '热管理系统',
      description: '电池热管理、散热设计、温度控制等热相关技术',
      icon: Thermometer,
      color: 'from-red-500 to-red-600',
      count: 67,
      trending: false,
      projects: [
        { name: 'ThermalBMS', stars: 756, description: '热管理电池系统' },
        { name: 'CoolCell', stars: 543, description: '电池冷却系统' },
        { name: 'HeatSim', stars: 432, description: '热仿真工具' }
      ]
    },
    {
      id: 'safety',
      name: '安全与监控',
      description: '电池安全监测、故障诊断、风险评估等安全技术',
      icon: Shield,
      color: 'from-yellow-500 to-yellow-600',
      count: 78,
      trending: false,
      projects: [
        { name: 'SafetyMonitor', stars: 987, description: '安全监控系统' },
        { name: 'FaultDetect', stars: 654, description: '故障检测算法' },
        { name: 'RiskAssess', stars: 321, description: '风险评估工具' }
      ]
    },
    {
      id: 'materials',
      name: '材料科学研究',
      description: '电极材料、电解液、隔膜等电池材料的研究与开发',
      icon: FlaskConical,
      color: 'from-pink-500 to-pink-600',
      count: 123,
      trending: true,
      projects: [
        { name: 'MaterialDB', stars: 1567, description: '材料数据库' },
        { name: 'ElectrolyteDesign', stars: 890, description: '电解液设计工具' },
        { name: 'CathodeOpt', stars: 678, description: '正极材料优化' }
      ]
    },
    {
      id: 'manufacturing',
      name: '制造工艺优化',
      description: '电池制造过程优化、工艺控制、质量管理等制造技术',
      icon: Wrench,
      color: 'from-indigo-500 to-indigo-600',
      count: 45,
      trending: false,
      projects: [
        { name: 'ProcessOpt', stars: 543, description: '工艺优化工具' },
        { name: 'QualityControl', stars: 432, description: '质量控制系统' },
        { name: 'MfgSim', stars: 321, description: '制造仿真平台' }
      ]
    },
    {
      id: 'testing',
      name: '测试与表征工具',
      description: '电池性能测试、电化学表征、数据采集等测试技术',
      icon: TestTube,
      color: 'from-teal-500 to-teal-600',
      count: 87,
      trending: false,
      projects: [
        { name: 'TestBench', stars: 876, description: '电池测试平台' },
        { name: 'DataLogger', stars: 654, description: '数据采集系统' },
        { name: 'CharacterTool', stars: 543, description: '表征分析工具' }
      ]
    },
    {
      id: 'data-analysis',
      name: '数据分析与可视化',
      description: '电池数据分析、可视化展示、统计分析等数据处理技术',
      icon: BarChart3,
      color: 'from-cyan-500 to-cyan-600',
      count: 92,
      trending: true,
      projects: [
        { name: 'BEEP', stars: 890, description: '电池数据分析平台' },
        { name: 'BatteryViz', stars: 765, description: '电池数据可视化' },
        { name: 'AnalysisTool', stars: 543, description: '统计分析工具' }
      ]
    },
    {
      id: 'modeling',
      name: '数学建模工具',
      description: '电池数学模型、算法实现、数值计算等建模技术',
      icon: Layers,
      color: 'from-emerald-500 to-emerald-600',
      count: 73,
      trending: false,
      projects: [
        { name: 'MathModel', stars: 987, description: '数学建模库' },
        { name: 'AlgoKit', stars: 654, description: '算法工具包' },
        { name: 'NumSolver', stars: 432, description: '数值求解器' }
      ]
    },
    {
      id: 'optimization',
      name: '优化算法',
      description: '电池系统优化、参数调优、智能算法等优化技术',
      icon: Target,
      color: 'from-violet-500 to-violet-600',
      count: 56,
      trending: false,
      projects: [
        { name: 'OptimizeCore', stars: 765, description: '优化算法核心' },
        { name: 'ParamTuner', stars: 543, description: '参数调优工具' },
        { name: 'SmartOpt', stars: 432, description: '智能优化系统' }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* 页面头部 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            技术分类
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            按照电池技术领域分类浏览，快速找到您感兴趣的开源项目
          </p>
        </motion.div>

        {/* 分类统计 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {categories.length}
              </div>
              <div className="text-gray-600 dark:text-gray-400">技术分类</div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                {categories.reduce((sum, cat) => sum + cat.count, 0)}
              </div>
              <div className="text-gray-600 dark:text-gray-400">开源项目</div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {categories.filter(cat => cat.trending).length}
              </div>
              <div className="text-gray-600 dark:text-gray-400">热门分类</div>
            </div>
          </div>
        </motion.div>

        {/* 分类网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700 overflow-hidden group"
              >
                <div className="p-6">
                  {/* 分类头部 */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    {category.trending && (
                      <span className="px-2 py-1 bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 text-xs font-medium rounded-full">
                        热门
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {category.name}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                    {category.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {category.count}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      个项目
                    </span>
                  </div>

                  {/* 热门项目预览 */}
                  <div className="space-y-2 mb-4">
                    {category.projects.slice(0, 2).map((project, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm">
                        <span className="text-gray-700 dark:text-gray-300 truncate">
                          {project.name}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400 flex items-center">
                          ⭐ {project.stars}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* 查看更多按钮 */}
                  <Link
                    href={`/categories/${category.id}`}
                    className="block w-full bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-xl transition-colors text-center font-medium"
                  >
                    <span className="flex items-center justify-center">
                      查看全部项目
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* 底部行动号召 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl p-8 text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              没找到合适的分类？
            </h2>
            <p className="text-lg mb-6 opacity-90">
              我们持续收录更多电池技术相关的开源项目，欢迎推荐或贡献
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contribute"
                className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-xl font-medium transition-colors"
              >
                推荐项目
              </Link>
              <Link
                href="/search"
                className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-medium transition-colors"
              >
                搜索项目
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 
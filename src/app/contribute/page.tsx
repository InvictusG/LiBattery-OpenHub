'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Plus, 
  Github, 
  Link as LinkIcon, 
  Tag, 
  FileText, 
  Users, 
  Star,
  CheckCircle,
  AlertCircle,
  Info,
  Send,
  Heart,
  Loader2
} from 'lucide-react'

export default function ContributePage() {
  const [formData, setFormData] = useState({
    name: '',
    githubUrl: '',
    description: '',
    category: '',
    language: '',
    topics: '',
    license: '',
    contactEmail: '',
    reason: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const categories = [
    '电芯设计与建模',
    '电池寿命预测',
    '电池管理系统',
    '仿真与模拟工具',
    '热管理系统',
    '安全与监控',
    '材料科学研究',
    '制造工艺优化',
    '测试与表征工具',
    '数据分析与可视化',
    '数学建模工具',
    '优化算法'
  ]

  const languages = [
    'Python', 'C++', 'JavaScript', 'Java', 'MATLAB', 'R', 'Julia',
    'TypeScript', 'C', 'Go', 'Rust', 'Swift', 'Kotlin', 'Other'
  ]

  const licenses = [
    'MIT', 'Apache-2.0', 'GPL-3.0', 'BSD-3-Clause', 'BSD-2-Clause',
    'MPL-2.0', 'LGPL-3.0', 'GPL-2.0', 'CC-BY-4.0', 'Unlicense', 'Other'
  ]

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = '项目名称不能为空'
    }

    if (!formData.githubUrl.trim()) {
      newErrors.githubUrl = 'GitHub 链接不能为空'
    } else if (!formData.githubUrl.includes('github.com')) {
      newErrors.githubUrl = '请输入有效的 GitHub 链接'
    }

    if (!formData.description.trim()) {
      newErrors.description = '项目描述不能为空'
    } else if (formData.description.length < 50) {
      newErrors.description = '项目描述至少需要 50 个字符'
    }

    if (!formData.category) {
      newErrors.category = '请选择项目分类'
    }

    if (!formData.language) {
      newErrors.language = '请选择编程语言'
    }

    if (!formData.contactEmail.trim()) {
      newErrors.contactEmail = '联系邮箱不能为空'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
      newErrors.contactEmail = '请输入有效的邮箱地址'
    }

    if (!formData.reason.trim()) {
      newErrors.reason = '请说明推荐理由'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    
    // 模拟提交延迟
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // 重置表单
    setFormData({
      name: '',
      githubUrl: '',
      description: '',
      category: '',
      language: '',
      topics: '',
      license: '',
      contactEmail: '',
      reason: ''
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    
    // 清除对应字段的错误
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-md mx-auto text-center"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              提交成功！
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              感谢您的贡献！我们会在 1-3 个工作日内审核您提交的项目，并通过邮件通知您审核结果。
            </p>
            <div className="space-y-3">
              <button
                onClick={() => setIsSubmitted(false)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-medium transition-colors"
              >
                继续推荐项目
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-3 px-6 rounded-xl font-medium transition-colors"
              >
                返回首页
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
            分享您的开源项目
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            发现了一个优秀的锂电池开源项目？与社区分享，让更多人受益。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* 左侧信息面板 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {/* 提交指南 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Info className="h-5 w-5 text-blue-500 mr-2" />
                  提交指南
                </h3>
                <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>项目必须与锂离子电池技术相关</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>项目必须是开源的，有明确的开源许可证</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>项目应该有完整的文档和使用说明</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>项目应该是活跃维护的，最近有更新</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>请提供详细的项目描述和推荐理由</span>
                  </li>
                </ul>
              </div>

              {/* 审核流程 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Users className="h-5 w-5 text-purple-500 mr-2" />
                  审核流程
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-xs font-medium text-blue-600 dark:text-blue-400">1</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">项目提交</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">填写表单并提交项目信息</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-xs font-medium text-yellow-600 dark:text-yellow-400">2</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">初步审核</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">验证项目信息和基本要求</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-xs font-medium text-green-600 dark:text-green-400">3</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">项目上线</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">通过审核后添加到项目库</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 统计信息 */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Star className="h-5 w-5 text-orange-500 mr-2" />
                  社区贡献
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">本月提交</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">23 个</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">审核通过</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">18 个</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">通过率</span>
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">78%</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 右侧提交表单 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-2"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-100 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  推荐项目
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* 项目名称 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      项目名称 *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="例如：PyBaMM"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                        errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* GitHub 链接 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      GitHub 仓库链接 *
                    </label>
                    <div className="relative">
                      <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="url"
                        name="githubUrl"
                        value={formData.githubUrl}
                        onChange={handleInputChange}
                        placeholder="例如：https://github.com/your-name/your-repo"
                        className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
                          errors.githubUrl ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        }`}
                      />
                    </div>
                    {errors.githubUrl && (
                      <p className="mt-1 text-sm text-red-500 flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.githubUrl}
                      </p>
                    )}
                  </div>

                  {/* 项目简介 */}
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      项目简介 *
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="详细描述这个项目是做什么的，特点和优势等。"
                      className={`w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.description ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'}`}
                    />
                    <div className="flex justify-between items-center text-xs text-gray-500 mt-1">
                      <p className={`transition-colors ${formData.description.length < 50 ? 'text-red-500' : 'text-gray-500'}`}>
                        最少 50 个字符 (当前: {formData.description.length})
                      </p>
                      {errors.description && <p className="text-red-500">{errors.description}</p>}
                    </div>
                  </div>

                  {/* 分类和语言 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        项目分类 *
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.category ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'}`}
                      >
                        <option value="">选择分类</option>
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      </select>
                      {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                    </div>
                    <div>
                      <label htmlFor="language" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        编程语言 *
                      </label>
                      <select
                        id="language"
                        name="language"
                        value={formData.language}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.language ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'}`}
                      >
                        <option value="">选择语言</option>
                        {languages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
                      </select>
                      {errors.language && <p className="text-red-500 text-xs mt-1">{errors.language}</p>}
                    </div>
                  </div>

                  {/* 标签 */}
                  <div>
                    <label htmlFor="topics" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      技术标签 (可选, 英文逗号分隔)
                    </label>
                    <input
                      id="topics"
                      name="topics"
                      type="text"
                      value={formData.topics}
                      onChange={handleInputChange}
                      placeholder="例如: bms, machine-learning, simulation"
                      className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>

                  {/* 许可证 */}
                  <div>
                    <label htmlFor="license" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      开源许可证
                    </label>
                    <select
                      id="license"
                      name="license"
                      value={formData.license}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    >
                      <option value="">选择许可证 (如果适用)</option>
                      {licenses.map(lic => <option key={lic} value={lic}>{lic}</option>)}
                    </select>
                  </div>

                  {/* 联系邮箱 */}
                  <div>
                    <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      联系邮箱 *
                    </label>
                    <input
                      id="contactEmail"
                      name="contactEmail"
                      type="email"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      placeholder="您的邮箱地址，用于接收审核结果通知"
                      className={`w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.contactEmail ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'}`}
                    />
                    {errors.contactEmail && <p className="text-red-500 text-xs mt-1">{errors.contactEmail}</p>}
                  </div>

                  {/* 推荐理由 */}
                  <div>
                    <label htmlFor="reason" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      推荐理由 *
                    </label>
                    <textarea
                      id="reason"
                      name="reason"
                      value={formData.reason}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="您为什么推荐这个项目？它解决了什么关键问题？有何独特之处？"
                      className={`w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.reason ? 'border-red-500' : 'border-gray-200 dark:border-gray-600'}`}
                    />
                    {errors.reason && <p className="text-red-500 text-xs mt-1">{errors.reason}</p>}
                  </div>
                  
                  {/* 提交按钮 */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <><Loader2 className="animate-spin h-5 w-5 mr-2" /> 正在提交...</>
                      ) : (
                        <><Send className="h-5 w-5 mr-2" /> 提交审核</>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 
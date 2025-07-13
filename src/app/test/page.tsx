export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          LiBattery OpenHub
        </h1>
        <p className="text-gray-600 mb-8">
          测试页面 - 部署成功！
        </p>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">系统状态</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Next.js:</span>
              <span className="text-green-600">✓ 正常</span>
            </div>
            <div className="flex justify-between">
              <span>React:</span>
              <span className="text-green-600">✓ 正常</span>
            </div>
            <div className="flex justify-between">
              <span>Tailwind CSS:</span>
              <span className="text-green-600">✓ 正常</span>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <a 
            href="/"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            返回首页
          </a>
        </div>
      </div>
    </div>
  )
} 
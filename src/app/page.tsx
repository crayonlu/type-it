export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6">暗色主题测试</h1>
        
        <div className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">颜色测试</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary text-primary-foreground p-4 rounded">
                主色调
              </div>
              <div className="bg-secondary text-secondary-foreground p-4 rounded">
                次要色
              </div>
              <div className="bg-accent text-accent-foreground p-4 rounded">
                强调色
              </div>
              <div className="bg-muted text-muted-foreground p-4 rounded">
                静音色
              </div>
            </div>
          </div>
          
          <div className="border border-border rounded-lg p-4 bg-card">
            <h3 className="font-semibold mb-2">卡片示例</h3>
            <p className="text-muted-foreground">
              这是一个卡片组件，展示了暗色主题的颜色效果。
            </p>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">文本颜色测试</h2>
            <p className="text-foreground">这是主要文本颜色</p>
            <p className="text-muted-foreground">这是静音文本颜色</p>
            <p className="text-destructive">这是错误文本颜色</p>
          </div>
        </div>
      </div>
    </div>
  );
}

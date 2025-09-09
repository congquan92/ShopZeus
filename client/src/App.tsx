import { useState } from 'react'
import { Button } from './components/ui/button'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="flex min-h-svh flex-col items-center justify-center">
      <Button onClick={() => setCount((count) => count + 1)}>Click me</Button>
      <span className="text-2xl">{count}</span>
    </div>
    </>
  )
}

export default App

import React, { Suspense, useEffect, useState, useRef } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from './router'
import AppHeader from './components/app-header'
import AppFooter from './components/app-footer'
import AppPlayerBar from './views/player/app-player-bar'
import { useAppDispatch } from './store'
import { fetchCurrentSongAction } from './views/player/store/player'

function App() {
  //获取某一首喜欢的歌
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchCurrentSongAction(2712612202))
  }, [])

  //控制播放器栏显示/隐藏的逻辑
  const [showBar, setShowBar] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // 监听鼠标移动事件
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const windowHeight = window.innerHeight
      const mouseY = event.clientY

      // 如果鼠标在屏幕底部 80px 的区域内
      if (mouseY > windowHeight - 80) {
        // 清除可能存在的隐藏定时器
        if (timerRef.current) {
          clearTimeout(timerRef.current)
          timerRef.current = null
        }
        setShowBar(true) // 显示播放器栏
      } else {
        // 如果播放器栏是显示的，并且没有设置隐藏定时器
        if (showBar && !timerRef.current) {
          // 设置一个 1 秒后隐藏的定时器
          timerRef.current = setTimeout(() => {
            setShowBar(false)
          }, 1000)
        }
      }
    }

    // 挂载事件监听
    window.addEventListener('mousemove', handleMouseMove)

    // 组件卸载时清除事件监听
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      // 同时清除可能还未执行的定时器
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [showBar])

  return (
    <div className="App">
      <AppHeader />
      <Suspense fallback="">
        <div className="main">{useRoutes(routes)}</div>
      </Suspense>
      <AppFooter />
      <AppPlayerBar show={showBar} />
    </div>
  )
}

export default App

import React, { memo, useEffect, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import {
  BarControl,
  BarOperator,
  BarPlayerInfo,
  PlayerBarWrapper
} from './style'
import { Slider } from 'antd'
import { Link } from 'react-router-dom'
import { shallowEqualApp, useAppDispatch, useAppSelector } from '@/store'
import { formatTime, getImageSize } from '@/utils/format'
import { shallowEqual } from 'react-redux'
import { getSongPlayUrl } from '@/utils/handle-player'
import { changeLyricIndexAction } from '../store/player'

interface IProps {
  children?: ReactNode
  show?: boolean
}

const AppPlayerBar: FC<IProps> = ({ show }) => {
  /** 组件内部定义的数据 */
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [isSliding, setIsSliding] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  /** 从redux中获取数据 */
  const { currentSong, lyrics, lyricIndex } = useAppSelector(
    (state) => ({
      currentSong: state.player.currentSong,
      lyrics: state.player.lyrics,
      lyricIndex: state.player.lyricIndex
    }),
    shallowEqualApp
  )

  const dispatch = useAppDispatch()

  /** 组件内的副作用操作 */
  useEffect(() => {
    // 1.设置新的歌曲src
    if (!currentSong?.id) return
    audioRef.current!.src = getSongPlayUrl(currentSong.id)

    // 2.如果之前是播放状态, 则尝试播放新的歌曲
    if (isPlaying) {
      audioRef.current!.play().catch((err) => {
        console.log('歌曲切换播放失败:', err)
        setIsPlaying(false) // 播放失败, 将状态设置回去
      })
    }

    // 2.获取音乐的总时长
    setDuration(currentSong.dt)
  }, [currentSong])

  /** 音乐播放的进度处理 */
  function handleTimeUpdate() {
    // 1.获取当前的播放时间
    const currentTime = audioRef.current!.currentTime * 1000

    // 2.计算当前歌曲进度
    if (!isSliding) {
      const progress = (currentTime / duration) * 100
      setProgress(progress)
      setCurrentTime(currentTime)
    }

    // 3.根据当前的时间匹配对应的歌词
    // currentTime/lyrics
    let index = lyrics.length - 1
    for (let i = 0; i < lyrics.length; i++) {
      const lyric = lyrics[i]
      if (lyric.time > currentTime) {
        index = i - 1
        break
      }
    }

    // 4.匹配上对应的歌词的index
    if (lyricIndex === index || index === -1) return
    dispatch(changeLyricIndexAction(index))
  }

  /** 组件内部的事件处理 */
  function handlePlayBtnClick() {
    const audioEl = audioRef.current!

    // 根据当前状态决定是播放还是暂停
    if (!isPlaying) {
      audioEl
        .play()
        .then(() => {
          setIsPlaying(true)
        })
        .catch((err) => {
          console.log('播放失败:', err)
          setIsPlaying(false)
        })
    } else {
      audioEl.pause()
      setIsPlaying(false)
    }
  }

  function handleSliderChanging(value: number) {
    // 0.目前是处于拖拽状态
    setIsSliding(true)

    // 1.设置progress
    setProgress(value)

    // 2.获取value对应位置的时间
    const currentTime = (value / 100) * duration
    setCurrentTime(currentTime)
  }

  function handleSliderChanged(value: number) {
    // 1.获取点击位置的时间
    const currentTime = (value / 100) * duration

    // 2.设置当前播放的时间
    audioRef.current!.currentTime = currentTime / 1000

    // 3.currentTime/progress
    setCurrentTime(currentTime)
    setProgress(value)
    setIsSliding(false)
  }

  return (
    <PlayerBarWrapper className="sprite_playbar" $show={show}>
      <div className="content wrap-v2">
        <BarControl $isPlaying={isPlaying}>
          <button className="btn sprite_player prev"></button>
          <button
            className="btn sprite_player play"
            onClick={handlePlayBtnClick}
          ></button>
          <button className="btn sprite_player next"></button>
        </BarControl>

        <BarPlayerInfo>
          <Link to="/player">
            <img
              className="image"
              src={getImageSize(currentSong?.al?.picUrl, 50)}
              alt=""
            />
          </Link>
          <div className="info">
            <div className="song">
              <span className="song-name">{currentSong.name}</span>
              <span className="singer-name">{currentSong?.ar?.[0]?.name}</span>
            </div>
            <div className="progress">
              {/* Slider组件 */}
              <Slider
                step={0.5}
                value={progress}
                tooltip={{ formatter: null }}
                onChange={handleSliderChanging}
                onChangeComplete={handleSliderChanged}
              />
              <div className="time">
                <span className="current">{formatTime(currentTime)}</span>
                <span className="divider">/</span>
                <span className="duration">{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        </BarPlayerInfo>

        <BarOperator>
          <div className="left">
            <button className="btn pip"></button>
            <button className="btn sprite_playbar favor"></button>
            <button className="btn sprite_playbar share"></button>
          </div>
          <div className="right sprite_playbar">
            <button className="btn sprite_playbar volume"></button>
            <button className="btn sprite_playbar loop"></button>
            <button className="btn sprite_playbar playlist"></button>
          </div>
        </BarOperator>
      </div>
      <audio ref={audioRef} onTimeUpdate={handleTimeUpdate} />
    </PlayerBarWrapper>
  )
}

export default memo(AppPlayerBar)

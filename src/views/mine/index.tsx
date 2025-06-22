import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { MineWrapper } from './style'

interface IProps {
  children?: ReactNode
}

const Mine: FC<IProps> = () => {
  return (
    <MineWrapper>
      <div className="content wrap-v2">
        <div className="pic"></div>
      </div>
    </MineWrapper>
  )
}

export default memo(Mine)

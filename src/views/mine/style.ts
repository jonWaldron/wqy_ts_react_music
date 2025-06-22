import styled from 'styled-components'

export const MineWrapper = styled.div`
  .content {
    background-color: #fff;
    min-height: 700px;
    width: 980px; /* 和 wrap-v2 保持一致 */
    margin: 0 auto;
    border: 1px solid #d3d3d3;

    .pic {
      position: relative;
      width: 807px;
      height: 372px;
      margin: 0 auto;
      background: url(${require('@/assets/img/mine_sprite.png')}) 0 104px
        no-repeat;


        }
      }
    }
  }
`

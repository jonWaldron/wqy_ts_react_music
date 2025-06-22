import styled from 'styled-components'

export const AppFooterWrapper = styled.div`
  height: 172px;
  background-color: #f2f2f2;
  color: #666;
  border-top: 1px solid #d3d3d3;
  font-size: 12px;

  .content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start; /* 改为 flex-start, 保证左右两栏顶部对齐 */
  }
`

export const FooterLeft = styled.div`
  padding-top: 15px;
  line-height: 24px;

  .links {
    display: flex;
    margin-bottom: 15px; /* 增加和下方文字的间距 */

    a {
      color: #999;
      white-space: nowrap;
    }

    .line {
      margin: 0 10px;
      color: #c2c2c2;
    }
  }

  /* 统一设置下方每一行文字的样式 */
  div:not(.links) {
    margin-top: 2px;
  }

  span,
  a {
    margin-right: 14px;
  }

  .police-icon {
    display: inline-block;
    width: 14px;
    height: 14px;
    background: url(${require('@/assets/img/sprite_footer_01.png')}) no-repeat;
    background-position: -1px -108px;
    vertical-align: middle;
    margin-right: 4px;
  }
`

export const FooterRight = styled.ul`
  display: flex;
  margin-top: 33px; /* 根据视觉效果调整顶部间距 */

  .item {
    /* 不再使用复杂的 flex 布局，改用更简单的方式 */
    text-align: center; /* 让内部所有内容居中 */
    width: 70px; /* 给每个item一个固定宽度 */

    .link {
      display: block; /* 改为块级元素，会强制独占一行，实现上下布局 */
      width: 50px;
      height: 45px;
      margin: 0 auto 10px; /* 水平居中并增加和下方文字的间距 */

      background-image: url(${require('@/assets/img/sprite_footer_02.png')});
      background-size: 110px 450px;
    }

    /*
      以下是图标的背景定位。如果图标显示不正确或不显示，
      你需要根据你的 sprite_footer_02.png 图片文件，来手动调整这里的 background-position 值。
    */
    :nth-child(1) .link {
      background-position: -60px -101px;
    }
    :nth-child(2) .link {
      background-position: 0 0;
    }
    :nth-child(3) .link {
      background-position: -60px -50px;
    }
    :nth-child(4) .link {
      background-position: 0 -101px;
    }
    /* TODO: 请为第 5, 6, 7 个图标补充正确的 background-position */
    :nth-child(5) .link {
      background-position: -60px 0;
    }
    :nth-child(6) .link {
      background-position: 0 -50px;
    }
    :nth-child(7) .link {
      background-position: -60px -101px; /* 这是一个占位值 */
    }

    .title {
      color: #666;
    }
  }
`

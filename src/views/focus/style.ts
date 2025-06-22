import styled from 'styled-components'

export const FocusWrapper = styled.div`
  .content {
    background-color: #fff;
    min-height: 700px;

    .pic {
      position: relative;
      width: 902px; /* 根据图片实际尺寸调整 */
      height: 414px; /* 根据图片实际尺寸调整 */
      margin: 0 auto;
      background: url(${require('@/assets/img/friend_sprite.jpg')}) 0 104px
        no-repeat;
      background-position: 0 0; /* 修正：让背景图从顶部开始显示 */

      .login {
        position: absolute;
        width: 157px; /* 修正尺寸 */
        height: 48px; /* 修正尺寸 */
        left: 50%;
        top: 300px;
        transform: translateX(-50%); /* 使用 transform 居中更灵活 */
        text-indent: -9999px;

        &:hover {
          background: url(${require('@/assets/img/friend_sprite.jpg')}) -160px 0
            no-repeat;
        }
      }
    }
  }
`

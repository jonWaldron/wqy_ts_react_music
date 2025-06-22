import React, { Fragment, memo } from 'react'
import type { FC, ReactNode } from 'react'
import { footerLinks, footerImages } from '@/assets/data/local_data'
import { AppFooterWrapper, FooterLeft, FooterRight } from './style'

interface IProps {
  children?: ReactNode
}

const AppFooter: FC<IProps> = () => {
  return (
    <AppFooterWrapper>
      <div className="content wrap-v2">
        <FooterLeft>
          <div className="links">
            {footerLinks.map((item, index) => {
              return (
                <Fragment key={item.title}>
                  <a href={item.link} target="_blank" rel="noopener noreferrer">
                    {item.title}
                  </a>
                  {index < footerLinks.length - 1 && (
                    <span className="line">|</span>
                  )}
                </Fragment>
              )
            })}
          </div>
          <div className="report">
            <span>廉正举报</span>
            <span>不良信息举报邮箱: 51jubao@service.netease.com</span>
          </div>
          <div className="copyright">
            <span>互联网宗教信息服务许可证: 浙（2022）0000120</span>
            <span>增值电信业务经营许可证: 浙B2-20150198</span>
            <a
              href="https://beian.miit.gov.cn/"
              rel="noopener noreferrer"
              target="_blank"
            >
              粤B2-20090191-18 浙ICP备15006616号-4
            </a>
            <a
              href="https://beian.miit.gov.cn/"
              rel="noopener noreferrer"
              target="_blank"
            >
              工业和信息化部备案管理系统网站
            </a>
          </div>
          <div className="info">
            <span>网易公司版权所有©1997-2025</span>
            <span>杭州乐读科技有限公司运营: 浙网文[2024] 0900-042号</span>
            <a
              href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010802013307"
              rel="noopener noreferrer"
              target="_blank"
            >
              <i className="police-icon"></i>
              <span>浙公网安备 33010802013307号</span>
            </a>
            <a
              href="https://www.beian.gov.cn/portal/registerSystemInfo"
              rel="noopener noreferrer"
              target="_blank"
            >
              算法服务公示信息
            </a>
          </div>
        </FooterLeft>
        <FooterRight>
          {footerImages.map((item) => {
            return (
              <li className="item" key={item.link}>
                <a
                  className="link"
                  href={item.link}
                  rel="noopener noreferrer"
                  target="_blank"
                ></a>
                <span className="title">{item.title}</span>
              </li>
            )
          })}
        </FooterRight>
      </div>
    </AppFooterWrapper>
  )
}

export default memo(AppFooter)

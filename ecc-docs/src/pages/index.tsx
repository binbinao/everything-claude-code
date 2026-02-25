import React from 'react'
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import Heading from '@theme/Heading'
import Translate from '@docusaurus/Translate'
import useBaseUrl from '@docusaurus/useBaseUrl'
import styles from './index.module.css'

export default function Home(): JSX.Element {
  const alipayQrUrl = useBaseUrl('/img/zfb.jpg');
  const wechatQrUrl = useBaseUrl('/img/wxpay.jpg');

  return (
    <Layout title="ECC Learning Site" description="Everything Claude Code learning hub - Updated 2026-02-25">
      <header className="hero hero--primary">
        <div className="container">
          <div className={styles.heroRow}>
            {/* Left: Main Content */}
            <div className={styles.heroContent}>
              <Heading as="h1" className="hero__title">
                Everything Claude Code
              </Heading>
              <p className="hero__subtitle">
                <Translate id="homepage.subtitle">
                  你的 ECC 学习站点已准备就绪：文档、教程、最佳实践，一站搞定。
                </Translate>
              </p>
              <div className="button-group">
                <Link className="button button--secondary button--lg" to="/docs/intro">
                  <Translate id="homepage.button.start">开始学习</Translate>
                </Link>
                <Link className="button button--outline button--lg" to="/docs/quick-start">
                  <Translate id="homepage.button.quickstart">快速开始</Translate>
                </Link>
              </div>
            </div>
            
            {/* Right: Tip QR Codes */}
            <div className={styles.tipSection}>
              <div className={styles.tipHeader}>
                <span className={styles.tipIcon}>☕</span>
                <span className={styles.tipTitle}>
                  <Translate id="homepage.tip.title">觉得有帮助？</Translate>
                </span>
              </div>
              <p className={styles.tipSubtitle}>
                <Translate id="homepage.tip.subtitle">请作者喝杯咖啡，支持创作~</Translate>
              </p>
              <div className={styles.qrCodes}>
                <div className={styles.qrItem}>
                  <img src={alipayQrUrl} alt="支付宝" className={styles.qrImage} />
                  <span className={styles.qrLabel}>💙 <Translate id="homepage.tip.alipay">支付宝</Translate></span>
                </div>
                <div className={styles.qrItem}>
                  <img src={wechatQrUrl} alt="微信支付" className={styles.qrImage} />
                  <span className={styles.qrLabel}>💚 <Translate id="homepage.tip.wechat">微信支付</Translate></span>
                </div>
              </div>
              <p className={styles.tipNote}>
                <Translate id="homepage.tip.note">小额打赏，心意满满 💝</Translate>
              </p>
            </div>
          </div>
        </div>
      </header>
      <main>
        <section className="container margin-vert--xl">
          <div className="row">
            <div className="col col--4">
              <Heading as="h3">📚 <Translate id="homepage.feature1.title">结构化文档</Translate></Heading>
              <p><Translate id="homepage.feature1.desc">从零到一掌握 ECC 的 Agents、Commands、Hooks 与 Rules。</Translate></p>
            </div>
            <div className="col col--4">
              <Heading as="h3">🎓 <Translate id="homepage.feature2.title">交互式教程</Translate></Heading>
              <p><Translate id="homepage.feature2.desc">用真实场景演练 /plan、/tdd、/build-fix 的完整流程。</Translate></p>
            </div>
            <div className="col col--4">
              <Heading as="h3">🚀 <Translate id="homepage.feature3.title">最佳实践集</Translate></Heading>
              <p><Translate id="homepage.feature3.desc">内置 TypeScript、Python、Go 等主流技术栈的实战方案。</Translate></p>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  )
}

import React from 'react'
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import Heading from '@theme/Heading'
import styles from './index.module.css'

export default function Home(): JSX.Element {
  return (
    <Layout title="ECC Learning Site" description="Everything Claude Code learning hub">
      <header className="hero hero--primary">
        <div className="container">
          <div className={styles.heroRow}>
            {/* Left: Main Content */}
            <div className={styles.heroContent}>
              <Heading as="h1" className="hero__title">
                Everything Claude Code
              </Heading>
              <p className="hero__subtitle">
                你的 ECC 学习站点已准备就绪：文档、教程、最佳实践，一站搞定。
              </p>
              <div className="button-group">
                <Link className="button button--secondary button--lg" to="/docs/intro">
                  开始学习
                </Link>
                <Link className="button button--outline button--lg" to="/docs/quick-start">
                  快速开始
                </Link>
              </div>
            </div>
            
            {/* Right: Tip QR Codes */}
            <div className={styles.tipSection}>
              <div className={styles.tipHeader}>
                <span className={styles.tipIcon}>☕</span>
                <span className={styles.tipTitle}>觉得有帮助？</span>
              </div>
              <p className={styles.tipSubtitle}>请作者喝杯咖啡，支持创作~</p>
              <div className={styles.qrCodes}>
                <div className={styles.qrItem}>
                  <img src="/img/zfb.jpg" alt="支付宝" className={styles.qrImage} />
                  <span className={styles.qrLabel}>💙 支付宝</span>
                </div>
                <div className={styles.qrItem}>
                  <img src="/img/wxpay.jpg" alt="微信支付" className={styles.qrImage} />
                  <span className={styles.qrLabel}>💚 微信支付</span>
                </div>
              </div>
              <p className={styles.tipNote}>小额打赏，心意满满 💝</p>
            </div>
          </div>
        </div>
      </header>
      <main>
        <section className="container margin-vert--xl">
          <div className="row">
            <div className="col col--4">
              <Heading as="h3">📚 结构化文档</Heading>
              <p>从零到一掌握 ECC 的 Agents、Commands、Hooks 与 Rules。</p>
            </div>
            <div className="col col--4">
              <Heading as="h3">🎓 交互式教程</Heading>
              <p>用真实场景演练 /plan、/tdd、/build-fix 的完整流程。</p>
            </div>
            <div className="col col--4">
              <Heading as="h3">🚀 最佳实践集</Heading>
              <p>内置 TypeScript、Python、Go 等主流技术栈的实战方案。</p>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  )
}

import React, { useState } from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

type PaymentMethod = 'alipay' | 'wechat';

interface TipButtonProps {
  variant?: 'default' | 'compact';
}

export default function TipButton({ variant = 'default' }: TipButtonProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('alipay');

  // Resolve image URLs at top level to comply with React Hooks rules
  const alipayQrUrl = useBaseUrl('/img/zfb.jpg');
  const wechatQrUrl = useBaseUrl('/img/wxpay.jpg');

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      {/* Tip Button */}
      <div className={`${styles.tipContainer} ${variant === 'compact' ? styles.compact : ''}`}>
        <button className={styles.tipButton} onClick={handleOpen}>
          <span className={styles.coffeeIcon}>☕</span>
          <span className={styles.tipText}>
            {variant === 'compact' ? '请作者喝杯咖啡' : '觉得有帮助？请作者喝杯咖啡~'}
          </span>
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className={styles.modalOverlay} onClick={handleClose}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>🎉 感谢你的支持！</h3>
              <button className={styles.closeButton} onClick={handleClose}>
                ✕
              </button>
            </div>

            {/* Body */}
            <div className={styles.modalBody}>
              <p className={styles.tipMessage}>
                如果这些内容帮到了你，请我喝杯咖啡吧~ <br />
                <span className={styles.tipNote}>小额打赏，心意满满 💝</span>
              </p>

              {/* Payment Method Tabs */}
              <div className={styles.paymentTabs}>
                <button
                  className={`${styles.tabButton} ${paymentMethod === 'alipay' ? styles.active : ''}`}
                  onClick={() => setPaymentMethod('alipay')}
                >
                  <span className={styles.tabIcon}>💙</span> 支付宝
                </button>
                <button
                  className={`${styles.tabButton} ${paymentMethod === 'wechat' ? styles.active : ''}`}
                  onClick={() => setPaymentMethod('wechat')}
                >
                  <span className={styles.tabIcon}>💚</span> 微信支付
                </button>
              </div>

              {/* QR Code Display */}
              <div className={styles.qrCodeContainer}>
                <img
                  src={paymentMethod === 'alipay' ? alipayQrUrl : wechatQrUrl}
                  alt={paymentMethod === 'alipay' ? '支付宝收款码' : '微信收款码'}
                  className={styles.qrCode}
                />
              </div>

              <p className={styles.scanHint}>
                打开{paymentMethod === 'alipay' ? '支付宝' : '微信'}扫一扫
              </p>
            </div>

            {/* Footer */}
            <div className={styles.modalFooter}>
              <span className={styles.thankYou}>感谢每一份支持与鼓励 ❤️</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

'use client'
import styles from './btn.module.css'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useState, useEffect } from 'react';
import useApprove from '../../Hooks/useApprove'
import useContractWrite from '../../Hooks/useContractWrite'

const Btn = ( {children } ) => {
  return (
    <button className={styles.btn}>
        {children}
    </button>
  )
}

export default Btn


const SmallBtn = ( {children } ) => {
    return (
        <button className={`${styles.btn} ${styles.smallBtn}`}>
            {children}
        </button>
    )
}

export { SmallBtn }


const WalletBtn = ( {children } ) => {
    return (
        <button className={`${styles.btn} ${styles.walletBtn}`}>
            {children}
        </button>
    )
}

export { WalletBtn }


const ConnectBtn = () => {


  // UseEffect to check window size, don't forget we're using Next, so we need to bypass window is not defined error

  const [windowSize, setWindowSize] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowSize(window.innerWidth);
    }
  }, []);


  useEffect(() => {
    if (windowSize < 581) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [windowSize]);



    return (
        <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          authenticationStatus,
          mounted,
        }) => {
          // Note: If your app doesn't use authentication, you
          // can remove all 'authenticationStatus' checks
          const ready = mounted && authenticationStatus !== 'loading';
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus ||
              authenticationStatus === 'authenticated');
  
          return (
            <div
              {...(!ready && {
                'aria-hidden': true,
                'style': {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <button onClick={openConnectModal} type="button" className={`${styles.btn} ${styles.smallBtn} ${styles.connectBtn}`}>
                      Connect Wallet
                    </button>
                  );
                }
  
                if (chain.unsupported) {
                  return (
                    <button onClick={openChainModal} type="button" className={`${styles.btn} ${styles.smallBtn} ${styles.connectBtn}`}>
                      Wrong network
                    </button>
                  );
                }
  
                return (
                  <div style={{ display: 'flex', gap: 12 }}>  
                    <button onClick={openAccountModal} type="button" className={`${styles.btn} ${styles.smallBtn} ${styles.connectBtn}`}>
                      {account.displayName}
                      {!isMobile && account.displayBalance
                        ? ` (${account.displayBalance})`
                        : ''}
                    </button>
                  </div>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
    )
}

export { ConnectBtn }





const LoadingSpinner = () => {
  return <div className={styles.spinner}></div>;
};

// Composant pour le popup
const Popup = ({ message, type }) => {
  return (
    <div className={`${styles.popup} ${type === 'error' ? styles.popupError : styles.popupSuccess}`}>
      {message}
    </div>
  );
};




const ApproveBtn = ({ children, tokenContract, spenderAddress }) => {
  const { approve, transactionHash, error, loading } = useApprove(tokenContract, spenderAddress);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState(''); // "error" or "success"

  useEffect(() => {
    let timeoutId;
    if (transactionHash) {
      setShowPopup(true);
      setPopupMessage('Approve successful');
      setPopupType('success');
      timeoutId = setTimeout(() => setShowPopup(false), 5000);
    } else if (error) {
      setShowPopup(true);
      setPopupMessage(error);
      setPopupType('error');
      timeoutId = setTimeout(() => setShowPopup(false), 5000);
    }

    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
    };
  }, [transactionHash, error]);

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted !== 'loading';
        const connected = ready && account && chain;

        if (!connected) {
          return (
            <button 
              onClick={openConnectModal} 
              type="button" 
              className={`${styles.btn} ${styles.smallBtn} ${styles.connectBtn}`}
            >
              Connect Wallet
            </button>
          );
        } else {
          return (
            <div className={styles.approveBtnWrapper}>
              {showPopup && <Popup message={popupMessage} type={popupType} />}
              <button 
                className={`${styles.btn} ${styles.approveBtn} ${styles.smallBtn}`} 
                onClick={() => approve()}
              >
                {loading ? <LoadingSpinner /> : `Approve ${children}`}
              </button>
            </div>
          );
        }
      }}
    </ConnectButton.Custom>
  );
};

export { ApproveBtn };

const ContractFunctionBtn = ({ 
  children, 
  contract, 
  functionName, 
  callArgs = [], 
  options = {},
}) => {
  const { callFunction, transactionHash, error, loading } = useContractWrite(contract, functionName, options);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState(''); // "error" or "success"

  useEffect(() => {
    let timeoutId;
    if (transactionHash) {
      setShowPopup(true);
      setPopupMessage(`${functionName} successful`);
      setPopupType('success');
      timeoutId = setTimeout(() => setShowPopup(false), 5000);
    } else if (error) {
      setShowPopup(true);
      setPopupMessage(error);
      setPopupType('error');
      timeoutId = setTimeout(() => setShowPopup(false), 5000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [transactionHash, error, functionName]);

  const handleButtonClick = async () => {
    await callFunction(...callArgs);
  };

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted !== 'loading';
        const connected = ready && account && chain;

        if (!connected) {
          return (
            <button 
              onClick={openConnectModal} 
              type="button" 
              className={`${styles.btn} ${styles.smallBtn} ${styles.connectBtn}`}
            >
              Connect Wallet
            </button>
          );
        } else {
          return (
            <div className={styles.btnWrapper}>
              {showPopup && <Popup message={popupMessage} type={popupType} />}
              <button 
                className={`${styles.btn} ${styles.functionBtn} ${styles.smallBtn}`} 
                onClick={handleButtonClick}
              >
                {loading ? <LoadingSpinner /> : `${children}`}
              </button>
            </div>
          );
        }
      }}
    </ConnectButton.Custom>
  );
};

export { ContractFunctionBtn };

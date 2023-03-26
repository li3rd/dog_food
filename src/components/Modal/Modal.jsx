import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import s from './Modal.module.css'




function ModalInner({ closeHandler, children }) {
  useEffect(() => {
    let html = document.querySelector('html')
    if (!(html.scrollHeight === html.clientHeight)) {
      document.body.style.overflow = 'hidden'
      document.querySelector('html').style.marginRight = '18px';
    }
    return () => {
      document.querySelector('html').style.marginRight = ''
      document.body.style.overflow = 'unset'
    }
  }, [closeHandler])


  return (
    <div className={s.modalInner}>
      {children}
    </div>
  )
}

export function Modal({ isOpen, closeHandler, children }) {

  if (!isOpen) return null
  
  const closeByTimes = () => {
    closeHandler()
  }
  const closeByClickWrapper = (e) => {
    if (e.target === e.currentTarget) {
      closeHandler()
    }
  }

  return createPortal(
    <div onMouseDown={closeByClickWrapper} className={s.wrapper}>
      <ModalInner closeHandler={closeHandler}>
        <span onClick={closeByTimes} className={s.times}>&times;</span>
        {children}
      </ModalInner>
    </div>, document.getElementById('modal-root') )
}
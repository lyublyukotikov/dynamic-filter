import React, { useState, useEffect } from 'react';
import HeaderForm from '@/components/elements/HeaderForm/HeaderForm';
import ModalWindow from '@/components/elements/ModalWindow/ModalWindow';
import { observer } from 'mobx-react-lite';
import BlueButton from '../UI/BlueButton/BlueButton';

const Layout = observer(({ children }: { children: React.ReactNode }) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    document.body.style.overflow = showModal ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showModal]);

  const closeModal = () => {
    setShowModal(false);
  };

  const openDrawer = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <HeaderForm openDrawer={openDrawer} closeModal={closeModal} />
      <main>{children}</main>

      <BlueButton />
      {showModal && (
        <div
          className="modal-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 9999,
          }}
        >
          <ModalWindow openDrawer={openDrawer} closeModal={closeModal} />
        </div>
      )}
    </>
  );
});

export default Layout;

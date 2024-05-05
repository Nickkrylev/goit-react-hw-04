import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalStyled } from './Modal.styled';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export function Modal({ onCloseModal, currentImage }) {
  useEffect(() => {
    document.addEventListener('keydown', onEscapeClick);

    return () => document.removeEventListener('keydown', onEscapeClick);
  });

  const onEscapeClick = e => {
    if (e.code === 'Escape') {
      onCloseModal();
    }
  };

  const onOverlayClick = e => {
    if (e.target === e.currentTarget) {
      onCloseModal();
    }
  };

  return createPortal(
    <Overlay onClick={onOverlayClick}>
      <ModalStyled>
        <img src={currentImage} alt="" />
      </ModalStyled>
    </Overlay>,
    modalRoot
  );
}

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  currentImage: PropTypes.string.isRequired,
};

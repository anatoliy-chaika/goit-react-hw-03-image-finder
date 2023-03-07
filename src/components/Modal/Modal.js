import PropTypes from 'prop-types';
import { Overlay, ModalStyle } from './Modal.styled';

export const Modal = ({ image, isOpen, onClose }) => {
  // window.addEventListener('keydown', function (e) {
  //   if (e.key === 'Escape') {
  //     onClose();
  //   }
  // });
  return (
    <Overlay onClick={() => onClose()}>
      <ModalStyle isOpen={isOpen}>
        <img src={image} alt="search" width="1000" />
      </ModalStyle>
    </Overlay>
  );
};

Modal.propTypes = {
  img: PropTypes.array,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

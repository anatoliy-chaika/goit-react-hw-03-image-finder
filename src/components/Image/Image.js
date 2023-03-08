import { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import { ImageGalleryItemImage } from '../ImageGalleryItem/ImageGalleryItem.syled';

export class Image extends Component {
  state = {
    isOpen: false,
  };
  openModal = () => this.setState({ isOpen: true });

  closeModal = () => this.setState({ isOpen: false });

  render() {
    const { img } = this.props;
    return (
      <>
        <ImageGalleryItemImage
          onClick={this.openModal}
          src={img.webformatURL}
          alt={img.tags}
        />
        {this.state.isOpen && (
          <Modal
            image={img.largeImageURL}
            isOpen={this.state.isOpen}
            onClose={this.closeModal}
            alt={img.tags}
          />
        )}
      </>
    );
  }
}

Image.propTypes = {
  img: PropTypes.object,
};

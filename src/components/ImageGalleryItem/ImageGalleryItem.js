import { Component } from 'react';

import { ImageGalleryItems } from './ImageGalleryItem.syled';
import { Image } from 'components/Image/Image';

export class ImageGalleryItem extends Component {
  render() {
    const { array } = this.props;

    return array.map(el => {
      return (
        <ImageGalleryItems key={el.id}>
          <Image img={el} />
        </ImageGalleryItems>
      );
    });
  }
}

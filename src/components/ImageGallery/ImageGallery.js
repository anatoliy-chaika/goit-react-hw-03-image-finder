import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';

import { getImage } from 'components/Servises/GetImage';
import { Component } from 'react';
import { ImageGallery, ErrorMessage } from './ImageGallery.styled';
import { Button } from '../Button/Button';

class ImageList extends Component {
  state = {
    images: [],
    status: 'idle',
    error: '',
    page: 1,
    totalImg: 0,
  };

  handleLoad = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
    console.log(this.state.images.length);
  };

  async componentDidUpdate(prevProps, prevState) {
    try {
      if (prevProps.imageName !== this.props.imageName) {
        this.setState({ images: [], status: 'pending', totalImg: 0, page: 1 });
        const { hits, totalHits } = await getImage(this.props.imageName);
        this.setState({
          images: [...hits],
          status: 'resolved',
          totalImg: totalHits,
        });
        if (hits.length === 0) {
          return toast.error(`Nothing found for name ${this.props.imageName}!`);
        }
        return;
      }

      if (
        this.state.page !== 1 &&
        prevProps.imageName === this.props.imageName &&
        prevState.page !== this.state.page
      ) {
        this.setState({ status: 'pending' });
        const { hits, totalHits } = await getImage(
          this.props.imageName,
          this.state.page
        );
        this.setState({
          images: [...this.state.images, ...hits],
          status: 'resolved',
          totalImg: totalHits,
        });
        return;
      }
    } catch (error) {
      this.setState({ error, status: 'rejected' });
    }
  }

  render() {
    const { images, status, error, page, totalImg } = this.state;
    const isShow = page < Math.ceil(totalImg / 12);

    if (status === 'pending')
      return (
        <>
          <ImageGallery>
            <ImageGalleryItem array={images} />
          </ImageGallery>
          <Loader />
        </>
      );

    if (status === 'resolved')
      if (images.length !== 0)
        return (
          <>
            <ImageGallery>
              <ImageGalleryItem array={images} />
            </ImageGallery>
            {isShow && <Button onClick={this.handleLoad}></Button>}
          </>
        );
    if (status === 'rejected')
      return <ErrorMessage> your request with error {error}</ErrorMessage>;
  }
}

export default ImageList;

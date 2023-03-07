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
  };

  handleLoad = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.imageName !== this.props.imageName) {
      this.setState({ images: [], page: 1 });
    }
    if (
      prevProps.imageName !== this.props.imageName ||
      prevState.page !== this.state.page
    ) {
      this.setState({ status: 'pending' });
      getImage(this.props.imageName, this.state.page)
        .then(response => {
          if (!response.ok) {
            return Promise.reject(response.status);
          }
          return response.json();
        })
        .then(data => {
          this.setState({
            images: [...this.state.images, ...data.hits],
            status: 'resolved',
          });
          if (data.hits.length === 0) {
            return toast.error(`Nothing found for ${this.props.imageName}!`);
          }
        })
        .catch(error => this.setState({ error: error, status: 'rejected' }));
    }
  }

  render() {
    const { images, status, error } = this.state;

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
          <ImageGallery>
            <ImageGalleryItem array={images} />
            <Button onClick={this.handleLoad}></Button>
          </ImageGallery>
        );
    if (status === 'rejected')
      return <ErrorMessage> your request with error {error}</ErrorMessage>;
  }
}

export default ImageList;

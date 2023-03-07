import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import { GlobalStyles } from '../GlodalStyles/Global.styled';
import ImageList from '../ImageGallery/ImageGallery';
import Searchbar from '../Searchbar/Searchbar';
import { AppDiv } from './App.styled';

export class App extends Component {
  state = {
    searchImage: '',
  };

  handleFormSubmit = searchImage => {
    this.setState({ searchImage });
  };

  render() {
    return (
      <AppDiv>
        <ToastContainer
          position="top-right"
          toastOptions={{
            duration: 1500,
          }}
        />
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageList imageName={this.state.searchImage} />

        <GlobalStyles />
      </AppDiv>
    );
  }
}

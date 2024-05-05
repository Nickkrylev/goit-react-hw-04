import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchImages } from 'services/images-api';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { AppStyled } from './App.styled';
import { Loader } from './Loader/Loader';

export function App() {
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [images, setImages] = useState([]);
  const [imagesQuantity, setImagesQuantity] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [currentImage, setCurrentImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPictures = async () => {
      try {
        if (query === '') {
          return;
        }

        if (currentPage === 1) {
          const { hits, totalHits } = await fetchImages(query, currentPage);

          if (hits.length === 0) {
            return alert('We don`t have images with this name');
          }

          setImages(hits);
          setImagesQuantity(totalHits);
          return;
        }

        const { hits } = await fetchImages(query, currentPage);
        setImages(prevState => [...prevState, ...hits]);
      } catch (error) {
        console.log(error);
      }
    };
    setIsLoading(true);
    fetchPictures();
    setIsLoading(false);
  }, [query, currentPage]);

  const onCloseModal = () => {
    setShowModal(false);
  };

  const onImageClick = currentImage => {
    setCurrentImage(currentImage);
    setShowModal(true);
  };

  const onSubmit = ({ search }, { resetForm }) => {
    setQuery(search);
    setCurrentPage(1);
    resetForm();
  };

  const onLoadMoreButtonClick = () => {
    setCurrentPage(prevState => prevState + 1);
  };

  return (
    <AppStyled>
      <Searchbar onSubmit={onSubmit}></Searchbar>
      <ImageGallery
        images={images}
        onImageClick={onImageClick}
        onLoadMoreButtonClick={onLoadMoreButtonClick}
        imagesQuantity={imagesQuantity}
      ></ImageGallery>
      {showModal && (
        <Modal onCloseModal={onCloseModal} currentImage={currentImage} />
      )}
      {isLoading && <Loader />}
    </AppStyled>
  );
}

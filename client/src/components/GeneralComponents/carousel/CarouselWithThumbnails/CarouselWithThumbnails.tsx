import React, { FC, useState } from 'react';
import classes from './CarouselWithThumbnails.module.css';
import { useAppSelector } from '../../../../hooks/redux';


const CarouselWithThumbnails: FC = () => {
  const dataItems = useAppSelector(state => state.ItemSlice)
  
  const [activeIndex, setActiveIndex] = useState(0);
  const handleRadioChange = (index: number) => {
    setActiveIndex(index);
  };

  const imageOfItems = dataItems.imageOfItems || [];

  return (
    <div className={classes.container}>
      <div className={classes.carousel}>
        {imageOfItems.map((_, imageIndex) => (
          <React.Fragment key={`radio-${dataItems.id}-${imageIndex}`}>
            <input
              type="radio"
              name="slides"
              defaultChecked={imageIndex === 0}
              id={`slide-${dataItems.id}-${imageIndex}`}
            />
          </React.Fragment>
        ))}

        <ul className={classes.carousel__slides}>
          {imageOfItems.map((image, imageIndex) => (
            <li className={classes.carousel__slide} key={`slide-${dataItems.id}-${imageIndex}`}>
              <figure>
                <div>
                  <img src={process.env.REACT_APP_GET_IMAGE_URL + image.url} alt={dataItems.title} />
                </div>
                <figcaption>
                  <span className={classes.smText}>{new Date(dataItems.updatedAt).toLocaleString()}</span>
                  <hr />
                  <span className={classes.smText}>Страна - допили страны{dataItems.countryId}</span>
                  <br />
                  {dataItems.description}
                  <span className={classes.credit}>{dataItems.title}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <ul className={classes.carousel__thumbnails}>
          {imageOfItems.map((image, imageIndex) => (
            <li key={`thumbnail-${dataItems.id}-${imageIndex}`} className={activeIndex === imageIndex ? classes.active : ''}>
              <label htmlFor={`slide-${dataItems.id}-${imageIndex}`} onClick={() => handleRadioChange(imageIndex)}>
                <img src={process.env.REACT_APP_GET_IMAGE_URL + image.url} alt={dataItems.title} />
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CarouselWithThumbnails;

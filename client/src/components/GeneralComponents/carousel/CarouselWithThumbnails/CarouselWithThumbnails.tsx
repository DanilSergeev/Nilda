import React, { FC, useState } from 'react';
import classes from './CarouselWithThumbnails.module.css';
import { IDataItems } from '../../../../models/IDataItems';


interface CarouselWithThumbnailsProps {
  items: IDataItems[];
}

const CarouselWithThumbnails: FC<CarouselWithThumbnailsProps> = ({ items }) => {
  const itemsList = items || [];

  const [activeIndex, setActiveIndex] = useState(0);

  
  const handleRadioChange = (index: number) => {
    setActiveIndex(index);
  };
  

  return (
    <section>
      <div className={classes.container}>
        <div className={classes.carousel}>

          {itemsList.flatMap((item, itemIndex) =>
            item.imageOfItems.map((_, imageIndex) => (
              <React.Fragment key={`radio-${item.id}-${imageIndex}`}>
                <input
                  type="radio"
                  name="slides"
                  defaultChecked={itemIndex === 0 && imageIndex === 0}
                  id={`slide-${item.id}-${imageIndex}`}
                />
              </React.Fragment>
            ))
          )}

          <ul className={classes.carousel__slides}>
            {itemsList.flatMap((item) =>
              item.imageOfItems.map((image, imageIndex) => (
                <li className={classes.carousel__slide} key={`slide-${item.id}-${imageIndex}`}>
                  <figure>
                    <div>
                      <img src={process.env.REACT_APP_GET_IMAGE_URL + image.url} alt={item.title} />
                    </div>
                    <figcaption>
                      {item.description}
                      <span className={classes.credit}>{item.title}</span>
                    </figcaption>
                  </figure>
                </li>
              ))
            )}
          </ul>

          <ul className={classes.carousel__thumbnails}>
            {itemsList.flatMap((item, itemIndex) =>
              item.imageOfItems.map((image, imageIndex) => (
                <li
                  key={`thumbnail-${item.id}-${imageIndex}`}
                  className={activeIndex === itemIndex * item.imageOfItems.length + imageIndex ? classes.active : ''}
                >
                  <label
                    htmlFor={`slide-${item.id}-${imageIndex}`}
                    onClick={() => handleRadioChange(itemIndex * item.imageOfItems.length + imageIndex)}
                  >
                    <img src={process.env.REACT_APP_GET_IMAGE_URL + image.url} alt={item.title} />
                  </label>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CarouselWithThumbnails;

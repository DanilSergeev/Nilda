import { FC, useState } from 'react';
import { useAppSelector } from '../../hooks/redux';
import CustomButton from '../GeneralComponents/button/CustomButton';
import CarouselWithThumbnails from '../GeneralComponents/carousel/CarouselWithThumbnails/CarouselWithThumbnails';
import FormTargetUpdataHeroesOrItems from './FormTargetUpdataHeroesOrItems';


const CarouselTarget: FC = () => {
  const authUser = useAppSelector(state => state.AuthSlice)

  const [isEditor, setIsEditor] = useState(false)
  const handlerChangeEditor = () => {
    setIsEditor(prev => !prev)
  }

  return (
    <>
      <section>
        {
          isEditor ? (
            <FormTargetUpdataHeroesOrItems
              handlerChangeEditor={handlerChangeEditor}
            />
          ) : (
            <>
              <CarouselWithThumbnails />
              {
                authUser.role === "ADMIN" ?
                  <div className='wrapper mb-3'>
                    <CustomButton onClick={handlerChangeEditor}>Редактировать</CustomButton>
                  </div>
                  :
                  <></>
              }
            </>
          )
        }
      </section>

    </>
  );
};

export default CarouselTarget;

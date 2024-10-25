import React, { useEffect, useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import CustomButton from '../GeneralComponents/button/CustomButton';
import { FC } from 'react';
import Form from 'react-bootstrap/Form';
import { IDataIdeas } from '../../models/IDataIdeas';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import IdeasService from '../../services/ideasService';
import { ideaSlice } from '../../store/reducers/IdeaSlice';
import { ideasSlice } from '../../store/reducers/IdeasSlice';



const ListIdeasComponent: FC = () => {
  const ideasData = useAppSelector(state => state.IdeasSlice.ideas)
  const dispatch = useAppDispatch()
  const { setIdea } = ideaSlice.actions
  const { setIdeas } = ideasSlice.actions

  const [sortBy, setSortBy] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<boolean>(true);

  const featchDataTargetIdea = async (id: number) => {
    try {
      const data = await IdeasService.getIdea(id) as { data: IDataIdeas };
      dispatch(setIdea(data.data))
      window.scrollTo(0, 0);
    } catch (error) {
      console.error('Ошибка -', error);
      
    }
  };



  const featchIdeas = async () => {
    try {
      const response = await IdeasService.getIdeas();
      dispatch(setIdeas(response.data))
    } catch (error) {
      console.error('Ошибка при загрузке идей:', error);
    }
  };










  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const toggleSortDirection = () => {
    setSortDirection(prev => !prev);
  };

  const sortIdeas = (ideas: IDataIdeas[]) => {
    return [...ideas].sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case '1':
          comparison = a.title.localeCompare(b.title);
          break;
        case '2':
          comparison = a.text.localeCompare(b.text);
          break;
        case '3':
          comparison = new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
          break;
        default:
          break;
      }
      return sortDirection ? comparison : -comparison;
    });
  };

  const filterIdeas = (ideas: IDataIdeas[]) => {
    return ideas.filter(idea =>
      idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      idea.text.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
  const sortedAndFilteredIdeas = filterIdeas(sortIdeas(ideasData));



  useEffect(() => {
    featchIdeas();
  }, []);

  return (
    <section className='listIdeas'>
      <div className='wrapper mb-4'>
        <div className='searchIdeas mb-3'>
          <Form.Select defaultValue={"0"} aria-label="Default select" onChange={handleSortChange}>
            <option value="" disabled>Выберите сортировку</option>
            <option value="1">Заголовок</option>
            <option value="2">Текст</option>
            <option value="3">Время добавления(без поиска)</option>
          </Form.Select>
          <CustomButton onClick={toggleSortDirection}>
            {sortDirection ? 'По убыванию' : 'По возрастанию'}
          </CustomButton>
        </div>
        <Form.Control
          disabled={sortBy === "3"}
          type="text"
          placeholder="Поиск..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="mb-3"
        />
      </div>

      <ListGroup className='wrapper' as="ol" numbered>
        {sortedAndFilteredIdeas.length > 0 ? (
          sortedAndFilteredIdeas.map(item => (
            <ListGroup.Item key={item.id} as="li" className="d-flex justify-content-between">
              <div className="ms-2 me-auto">
                <div>
                  <b>{item.title}</b> - {new Date(item.updatedAt).toLocaleString()}
                </div>
                <div>
                  {item.text.length > 150 ? item.text.substr(0, 150) + "..." : item.text}
                </div>
              </div>
              <div className='ButtonsListIdeas'>
                <CustomButton onClick={() => featchDataTargetIdea(item.id)}>Подробнее</CustomButton>
              </div>
            </ListGroup.Item>
          ))
        ) : (
          <ListGroup.Item>Нет идей для отображения</ListGroup.Item>
        )}
      </ListGroup>
    </section>
  );
};

export default ListIdeasComponent;

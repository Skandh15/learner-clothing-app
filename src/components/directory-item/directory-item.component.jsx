import { useNavigate } from 'react-router-dom';

import {
  BackgroundImage,
  Body,
  DirectoryItemContainer,
} from './directory-item.styles';

const DirectoryItem = ({ category }) => {
  const { categoryImageUrl, categoryTitle, categoryRoute } = category;
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(categoryRoute);

  return (
    <DirectoryItemContainer onClick={onNavigateHandler}>
      <BackgroundImage imageUrl={categoryImageUrl} />
      <Body>
        <h2>{categoryTitle}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;

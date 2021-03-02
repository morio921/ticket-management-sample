import styled from 'styled-components';

const ListContainer = styled.div`
  background-color: #e2e8f0;
  width: 296px;
  min-height: 3rem;
  margin-right: 0.5rem;
  border-radius: 4px;
  padding: 0.5rem;
  padding-right: 10px;
  flex-grow: 0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

const ListTitle = styled.h2`
  cursor: pointer;
  padding: 8px 16px 12px;
  font-size: 1rem;
  font-weight: 600;
`;

const ListCards = styled.div`
  max-height: 68vh;
  overflow-y: auto;
`;

export { ListContainer, ListTitle, ListCards };
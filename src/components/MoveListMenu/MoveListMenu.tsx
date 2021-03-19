import { FC } from 'react';
import { HiOutlineChevronLeft, HiOutlineX } from 'react-icons/hi';
import { useAppState, useClickOutsideRef } from '../../hooks';
import { findListIndexById } from '../../utils';
import {
  BoardSelectorContainer,
  MoveButton,
  MoveListContainer,
  MoveListDivider,
  MoveListHeader,
  MoveListTitle,
  PositionSelectorContainer,
  Select,
  SelectorContainer
} from './MoveListMenu.styles';

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  handleGoBack: () => void;
  listId: string;
}

const MoveListMenu: FC<Props> = ({ isOpen, handleClose, handleGoBack, listId }) => {
  const { state } = useAppState();
  const { ref } = useClickOutsideRef({
    mode: isOpen,
    setMode: handleClose
  });
  const defaultPosition = findListIndexById(state.lists, listId) + 1;

  return (
    <MoveListContainer ref={ref}>
      <MoveListHeader>
        <HiOutlineChevronLeft className='chevron-left' onClick={handleGoBack} />
        <MoveListTitle>Move list</MoveListTitle>
        <HiOutlineX className='x-sign' onClick={handleClose} />
      </MoveListHeader>

      <MoveListDivider />

      <SelectorContainer>
        <BoardSelectorContainer>
          <span className='position-text'>Board</span>
          <span className='position-number'>default (this demo has only one)</span>
        </BoardSelectorContainer>

        <PositionSelectorContainer>
          <span className='position-text'>Position</span>
          <span className='position-number'>{defaultPosition}</span>

          <Select name='positions' id='positions-select' defaultValue={defaultPosition}>
            {state.lists.map(list => {
              const position = findListIndexById(state.lists, list.id) + 1;
              return (
                <option value={position} key={list.id}>
                  {list.id === listId ? `${position} (current)` : position}
                </option>
              );
            })}
          </Select>
        </PositionSelectorContainer>

        <MoveButton>Move</MoveButton>
      </SelectorContainer>
    </MoveListContainer>
  );
};

export { MoveListMenu };

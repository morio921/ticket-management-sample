import { FC } from 'react';
import { HiOutlineX } from 'react-icons/hi';
import { useClickOutsideRef } from '../../hooks';
import {
  DisabledItem,
  ListActionsContainer,
  ListActionsDivider,
  ListActionsHeader,
  ListActionsItem,
  ListActionsTitle,
  ListActionsUl
} from './ListActionsMenu.styles';

interface Props {
  isOpen: boolean;
  handleClose: () => void;
  handleArchiveAllTasks: () => void;
  handleMoveAllTasks: () => void;
  handleRemove: () => void;
}

const ListActionsMenu: FC<Props> = ({
  isOpen,
  handleClose,
  handleArchiveAllTasks,
  handleMoveAllTasks,
  handleRemove
}) => {
  const { ref, clickOutsideListener } = useClickOutsideRef({
    mode: isOpen,
    setMode: handleClose
  });

  const removeList = () => {
    document.removeEventListener('click', clickOutsideListener);
    handleRemove();
  };

  return (
    <ListActionsContainer ref={ref}>
      <ListActionsHeader>
        <ListActionsTitle>List actions</ListActionsTitle>
        <HiOutlineX className='x-sign' onClick={handleClose} />
      </ListActionsHeader>

      <ListActionsDivider />

      <ListActionsUl>
        <DisabledItem>
          <button disabled>Add card...</button>
        </DisabledItem>
        <DisabledItem>
          <button disabled>Copy list... [WIP]</button>
        </DisabledItem>
        <DisabledItem>
          <button disabled>Move list... [WIP]</button>
        </DisabledItem>
      </ListActionsUl>

      <ListActionsDivider />

      <ListActionsUl>
        <DisabledItem>
          <button disabled>Sort by... [WIP]</button>
        </DisabledItem>
      </ListActionsUl>

      <ListActionsDivider />

      <ListActionsUl>
        <ListActionsItem>
          <button onClick={handleMoveAllTasks}>Move all cards in this list...</button>
        </ListActionsItem>
        <ListActionsItem>
          <button onClick={handleArchiveAllTasks}>Archive all cards in this list...</button>
        </ListActionsItem>
      </ListActionsUl>

      <ListActionsDivider />

      <ListActionsUl>
        <ListActionsItem>
          <button onClick={removeList}>Archive this list</button>
        </ListActionsItem>
      </ListActionsUl>
    </ListActionsContainer>
  );
};

export { ListActionsMenu };

import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';
import { EditItemForm } from '../EditItemForm';
import { CardContainer, CardIcons, TextContainer } from './Card.styles';

interface Props {
  id: string;
  text: string;
}

const Card: FC<Props> = ({ id, text }) => {
  const [editMode, setEditMode] = useState(false);
  const wrapperRef = useRef(null);

  const clickOutsideListener = useCallback(
    (e: MouseEvent) => {
      if (editMode && !(wrapperRef.current as any)?.contains(e.target as Node)) {
        setEditMode(false);
      }
    },
    [editMode]
  );

  useEffect(() => {
    // Attach the listeners on component mount.
    document.addEventListener('click', clickOutsideListener);

    // Detach the listeners on component unmount.
    return () => document.removeEventListener('click', clickOutsideListener);
  });

  const handleEdit = () => setEditMode(true);
  const handleClose = () => setEditMode(false);

  return (
    <div style={{ position: 'relative' }}>
      <CardContainer>
        <TextContainer>{text}</TextContainer>
        <CardIcons>
          <HiOutlinePencil className='icon' onClick={handleEdit} />
          <HiOutlineTrash className='icon' />
        </CardIcons>
      </CardContainer>

      {editMode && (
        <div
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: '#000000a6',
            position: 'fixed',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 99
          }}
        ></div>
      )}

      {editMode && (
        <div
          ref={wrapperRef}
          style={{
            height: 0,
            zIndex: 999,
            position: 'fixed'
          }}
        >
          <EditItemForm
            itemType='card'
            initialText={text}
            handleAdd={() => {}}
            handleClose={handleClose}
          />
        </div>
      )}
    </div>
  );
};

export { Card };

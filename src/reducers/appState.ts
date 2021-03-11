import { nanoid } from 'nanoid';
import { AppState } from '../contexts';
import { DragItem } from '../dragItem';
import { findListIndexById, findTaskList, moveItem, overrideListAtIndex } from '../utils';

export type Action =
  | {
      type: 'ADD_TASK';
      payload: { text: string; listId: string };
    }
  | {
      type: 'ADD_LIST';
      payload: string;
    }
  | {
      type: 'EDIT_TASK';
      payload: { taskId: string; text: string };
    }
  | {
      type: 'REMOVE_TASK';
      payload: string;
    }
  | {
      type: 'REMOVE_LIST';
      payload: string;
    }
  | {
      type: 'MOVE_LIST';
      payload: {
        dragIndex: number;
        hoverIndex: number;
      };
    }
  | {
      type: 'SET_DRAGGED_ITEM';
      payload: DragItem | undefined;
    };

const appStateReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'ADD_TASK': {
      const { listId, text } = action.payload;
      const targetListIndex = findListIndexById(state.lists, listId);
      const targetList = state.lists[targetListIndex];
      const newTargetList = {
        ...targetList,
        tasks: [...targetList.tasks, { id: nanoid(), text }]
      };

      return {
        ...state,
        lists: overrideListAtIndex(state.lists, newTargetList, targetListIndex)
      };
    }

    case 'ADD_LIST': {
      return {
        ...state,
        lists: [
          ...state.lists,
          {
            id: nanoid(),
            title: action.payload,
            tasks: []
          }
        ]
      };
    }

    case 'EDIT_TASK': {
      const { taskId, text } = action.payload;
      const listId = findTaskList(state.lists, taskId);
      const targetListIndex = findListIndexById(state.lists, listId);
      const targetList = state.lists[targetListIndex];
      const newTargetList = {
        ...targetList,
        tasks: targetList.tasks.map(task => {
          if (task.id === taskId) {
            return {
              ...task,
              text
            };
          }

          return task;
        })
      };

      return {
        ...state,
        lists: overrideListAtIndex(state.lists, newTargetList, targetListIndex)
      };
    }

    case 'REMOVE_TASK': {
      const { lists } = state;
      const taskId = action.payload;
      const listId = findTaskList(lists, taskId);
      const targetListIndex = findListIndexById(lists, listId);
      const targetList = lists[targetListIndex];
      const newTargetList = {
        ...targetList,
        tasks: targetList.tasks.filter(task => task.id !== taskId)
      };

      return {
        ...state,
        lists: overrideListAtIndex(lists, newTargetList, targetListIndex)
      };
    }

    case 'REMOVE_LIST': {
      const listId = action.payload;

      return {
        ...state,
        lists: state.lists.filter(list => list.id !== listId)
      };
    }

    case 'MOVE_LIST': {
      const { lists } = state;
      const { dragIndex, hoverIndex } = action.payload;

      return {
        ...state,
        lists: moveItem(lists, dragIndex, hoverIndex)
      };
    }

    case 'SET_DRAGGED_ITEM': {
      return {
        ...state,
        draggedItem: action.payload
      };
    }

    default:
      return state;
  }
};

export { appStateReducer };

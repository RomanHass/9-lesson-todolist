import { v1 } from 'uuid'
import { TasksStateType } from '../App'
import { AddTodolistActionType, RemoveTodolistActionType } from './todolists-reducer'
 
export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case 'REMOVE_TASK': {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
      }
    }
    case 'ADD_TASK': {
      const {todolistId, title} = action.payload
      const newTask = { id: v1(), title, isDone: false }
      return {...state, [todolistId]: [newTask, ...state[todolistId]]}
    }
    case 'CHANGE_TASK_STATUS': {
      const {todolistId, taskId, isDone} = action.payload
      return {...state, [todolistId]: state[todolistId].map(t => t.id === taskId ? {...t, isDone} : t)}
    }
    case 'CHANGE_TASK_TITLE': {
      const {todolistId, taskId, title} = action.payload
      return {...state, [todolistId]: state[todolistId].map(t => t.id === taskId ? {...t, title} : t)}
    }
    case 'ADD-TODOLIST': {
      return {...state, [action.payload.todolistId]: []}
    }
    case 'REMOVE-TODOLIST': {
      delete state[action.payload.id]
      return {...state}
    }
    default:
      throw new Error("I don't understand this type")
  }
}
 
// Action creators
export const removeTaskAC = (payload: {taskId: string, todolistId: string}) => {
  debugger
  return { type: 'REMOVE_TASK', payload } as const
}

export const addTaskAC = (payload: {todolistId: string, title: string}) => {
  return {type: 'ADD_TASK', payload} as const
}

export const changeTaskStatusAC = (payload: {todolistId: string, taskId: string, isDone: boolean}) => {
  return {type: 'CHANGE_TASK_STATUS', payload} as const
}

export const changeTaskTitleAC = (payload: {todolistId: string, taskId: string, title: string}) => {
  return { type: 'CHANGE_TASK_TITLE', payload } as const
}
 
// Actions types
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
 
type ActionsType = 
  RemoveTaskActionType 
  | AddTaskActionType 
  | ChangeTaskStatusActionType 
  | ChangeTaskTitleActionType 
  | AddTodolistActionType
  | RemoveTodolistActionType
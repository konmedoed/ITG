export type UserData = {
  userData: {
    src: string
    name: string
  }
}

export interface TaskData {
  taskId: string
  subject: string
  status: string
  description: string | undefined
  product: string
  workingNote: string
  priority: Priority
  responsible: string[] | []
  team: string[] | []
  comment: string | undefined
  agreeing: string[] | []
  openedDate: Date | undefined
  createdDate: Date | undefined
  openPerson:  string[] | []
  createPerson: string[] | []
}

export enum Status {
  var1 = 'Вариант 1',
  var2 = 'Вариант 2',
  new = 'Новая',
  var3 = 'Вариант 3'
}

export enum Priority {
  ultHight = 'Горящий',
  hight = 'Высокий',
  normal = 'Средний',
  low = 'Низкий',
  sLow = 'Дай бог руки дойдут'
}

export enum Product {
  pr1 = 'Проект 1',
  pr2 = 'Проект 2',
  pr3 = 'Проект 3',
  pr4 = 'Проект 4',
  paltform = 'Paltform'
}

export enum Team {
  gr1 = 'Group 1',
  gr2 = 'Group 2',
  gr3 = 'Group 3',
  gr4 = 'Group 4',
  support = 'Support Group'
}
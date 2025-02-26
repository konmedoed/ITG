import photo from './assets/user.png';
import { Priority, Product, Status, TaskData, Team } from './services/Types';

export const userData = {
  src: photo,
  name: 'Максим Галактионов'
}

export function taskData():TaskData {
  return (
    {
      taskId: 'STSK0004783',
      subject: 'На инциденте, запросе, проблеме, в статусе закрыто некоторые поля остаются редактируемыми для агента если он Caller',
      status: Status.new,
      description: undefined,
      product: Product.paltform,
      workingNote: 'Проверить ACL id=172830402014193655',
      priority: Priority.normal,
      responsible: ['Константин Константинопольский'],
      team: [Team.support],
      comment: undefined,
      agreeing: ['Андрей Пивоваров', 'Максим Галактионов', 'Алла Лин', 'Константин Константинопольский Константинович', 'Игорь Иванченко', 'Юлия Эйчаровна', 'Артём Подпрыгайко-Саппортов', 'Илья Вазнец', 'Михаил Вортенов', 'Наталья Нашевна', 'Евгения Итамовна', 'Алиса Киральчук'],
      openedDate: undefined,
      createdDate: new Date('10.22.2024'),
      openPerson:  ['Андрей Пивоваров'],
      createPerson: ['Андрей Пивоваров'],
    }
  )
}
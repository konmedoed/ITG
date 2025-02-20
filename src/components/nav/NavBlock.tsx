import { navListButton, navFavoriteButton, filterIcon, filterDefaultIcon, buttonPointer } from "../../services/SVGs";
import './NavBlock.scss';
import { formPlug } from "../../services/utilites";

export default function NavBlock(){
    function buttonCreator(text:string, id:string) {
    return (
      <button key={id} className="nav__option text-style_first">{buttonPointer()}<span>{text}</span></button>
    )
  }

  function buttonsListCreator() {
    const list = ['Моя работа', 'Структура портала', 'Личное расписание', 'Отсутствие на рабочем месте', 'Портфель услуг', 'Дашборды', 'Доски задач', 'Обращения', 'События', 'Инциденты', 'Проблемы', 'Настройка каталогов', 'Запросы на обслуживание', 'Запросы на изменение', 'Управление конфигурациями', 'Управление уровнем услуг', 'Настройка соответствий'];
    return (
      list.map((item, index) => buttonCreator(item, `option_${index}`))
    )
  }

  return (
    <div className="nav__wrapper">
      <nav className="nav">
        <button className='nav__all-list nav-button active'>{navListButton()}</button>
        <button className='nav__favorite nav-button'>{navFavoriteButton()}</button>
      </nav>
      <nav className="nav__list">
        <div className="nav__filter-wrapper">
          <label className="nav__filter">
            <form className="nav__filter-form" action="" onSubmit={formPlug}>
              <input className="nav__filter-input" type="text" placeholder="Поиск по меню"/>
            </form>
            <div className="nav__filter-icon">{filterIcon()}</div>
          </label>
          <button className="nav__filter-default-button">
            {filterDefaultIcon()}
          </button>
        </div>
        <div className="nav__list">
          {buttonsListCreator()}
        </div>
      </nav>
    </div>  
  )
}
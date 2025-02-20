import './header.scss';
import {setupButton, searchIcon, logo} from '../../services/SVGs';
import { UserData } from '../../services/Types';
import { formPlug } from '../../services/utilites';

export default function Header({userData}:UserData) {

  return (
    <header className='header'>
      <div className="header__logo">
        {logo()}
      </div>
      <div className="header__search-avatar-set">
        <div className="header__search">
          <form className="header__form" action="" onSubmit={formPlug}>
            <input className="header__input" type="text" name="" id="" placeholder='Поиск'/>
          </form>
          <div className="header__search-icon">{searchIcon()}</div>
        </div>
        <button className="header__user">
          <div>
            <img className="header__avatar" src={userData.src} alt="" />
          </div>
          <div className="header__username text-style_third">
            <span>{userData.name}</span>
          </div>
          
        </button>
        <button className='header__setup-button'>
            {setupButton()}
          </button>
      </div>
    </header>
  )
}
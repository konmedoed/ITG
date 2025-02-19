import './header.scss';
import photo from '../../assets/user.png';
import {setupButton, searchIcon, logo} from '../../SVGs';
import { FormEvent } from 'react';

export default function Header() {
  const user = {
    src: photo,
    name: 'Максим Галактионов'
  }

  return (
    <header className='header'>
      <div className="header__logo">
        {logo()}
      </div>
      <div className="header__search-avatar-set"> 
        {/* rename class! */}
        <div className="header__search">
          <form className="header__form" action="" onSubmit={formPlug}>
            <input className="header__input" type="text" name="" id="" placeholder='Поиск'/>
          </form>
          <div className="header__search-icon">{searchIcon()}</div>
        </div>
        <button className="header__user">
          <div>
            <img className="header__avatar" src={user.src} alt="" />
          </div>
          <div className="header__username text-style_third">
            <span>{user.name}</span>
          </div>
          
        </button>
        <button className='header__setup-button'>
            {setupButton()}
          </button>
      </div>
    </header>
  )
}

function formPlug(e:FormEvent){
  e.preventDefault();
  console.log(`doesn't reload`)
}
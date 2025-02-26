import { useEffect, useState } from "react";
import { addIcon, calendarIcon, clearInputIcon, closeButton, deleteAgreeingPersonIcon, searchTaskFormIcon } from "../../services/SVGs";
import { Priority, Product, Status, TaskData } from "../../services/Types";
import { formPlug, selectCreator } from "../../services/utilities";
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'
import './sub-task.scss';

export function SubTask({taskData, closeWindow}:{taskData:TaskData, closeWindow:()=>void}){
  const [responsible, setResponsible] = useState(taskData.responsible);
  const [team, setTeam] = useState(taskData.team);
  const [agreeing, setAgreeing] = useState(taskData.agreeing);
  const [openPerson, setOpenPerson] = useState(taskData.openPerson);
  const [createPerson, setCreatePerson] = useState(taskData.createPerson);
  const [openedDate, setOpenedDate] = useState(new Date());
  const [closedDate, setClosedDate] = useState(taskData.createdDate);
  const [choosenDate, setChoosenDate] = useState(0);

  useEffect(() => {
    const closeOnEscapePressed = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeWindow();
      }
    };
    window.addEventListener("keydown", closeOnEscapePressed);
    return () =>
      window.removeEventListener("keydown", closeOnEscapePressed);
  }, []);

  function createCardsRespPersons() {
    return responsible.map((item, index) => 
      <div className="form-page__resp-person" key={`resp${index}`}>
        <span className="text-style_first ">{item}</span>
      </div>
    )
  }

  function createTeamCards() {
    return team.map((item, index) => 
      <div className="form-page__team" key={`team${index}`}>
        <span className="text-style_first">{item}</span>
      </div>
    )
  }

  function createCardsAgreeingPersons() {
    return agreeing.map((item, index) => 
      <div className="form-page__agreeing-person" key={`agreeing${index}`}>
        <span className="text-style_first">{item}</span>
        <button type="button" className="form-page__delete-agreeing" onClick={() => deleteAgreeing(index)}>{deleteAgreeingPersonIcon()}</button>
      </div>
    )      
  }

  function deleteAgreeing(id:number) {
    if (agreeing !== undefined) {
      const arr = agreeing.filter((item, index) => {
        if (id !== index) return item
      });
  
      setAgreeing(arr);
    }
  }

  function createOpenPersons() {
    return openPerson.map((item, index) => 
      <div className="form-page__open-person" key={`openPerson${index}`}>
        <span className="text-style_first">{item}</span>
      </div>
    )
  }

  function createCreatePersons() {
    return createPerson.map((item, index) => 
      <div className="form-page__create-person" key={`createPerson${index}`}>
        <span className="text-style_first">{item}</span>
      </div>
    )
  }

  function customOpenedDateInput() { //корявый костыль, надеюсь будет время переписать
    let date = '';
    if (choosenDate > 0) {
      const day = () => {
        const value = openedDate.getDate();
        if (value > 9) return value
        return `0${value}`
      };
      const month = () => {
        const value = openedDate.getMonth() + 1;
        if (value > 9) return value
        return `0${value}`
      };
      const year = openedDate.getFullYear();
      date = `${day()}.${month()}.${year}`;
    }

    return (
      <div className="form-page__date-input-wrapper">
        <input className="form-page__input-date text-style_first" type="text" name="" id="" value={date} readOnly/>
        <button type="button" className="form-page__date-button">
          {calendarIcon()}
        </button>
      </div>
    )
  }

  function customClosedDateInput() { //корявый костыль, надеюсь будет время переписать
    const day = () => {
      const value = openedDate.getDate();
      if (value > 9) return value
      return `0${value}`
    };
    const month = () => {
      const value = openedDate.getMonth() + 1;
      if (value > 9) return value
      return `0${value}`
    };
    const year = openedDate.getFullYear();

    return (
      <div className="form-page__date-input-wrapper">
        <input className="form-page__input-date text-style_first" type="text" name="" id="" value={`${day()}.${month()}.${year}`} readOnly/>
        <button type="button" className="form-page__date-button">
          {calendarIcon()}
        </button>
      </div>
    )
  }

  function setOpenedDateHandler(date:Date | null) {
    if (date) {
      setOpenedDate(date);
      setChoosenDate(1);
    }
  }

  function setClosedDateHandler(date:Date | null) {
    if (date) {
      setClosedDate(date);
      // setChoosenDate(1);
    }
  }


  return(
    <section className="sub-task" onClick={e => e.stopPropagation()}>
      <form action="" onSubmit={formPlug}>
        <div className="sub-task__sub-heading">
          <div className="sub-task__create-wrapper">
            <p className="sub-task__create-heading text-style_first">Подзадача</p>
          </div>
          <div className="sub-task__save-block">
            <button type="submit" className="sub-task__save-button text-style_first">Сохранить</button>
            <button type="button" className="sub-task__cancel-button" onClick={closeWindow}>Отменить</button>
          </div>
          <button type="button" className="sub-task__close-button" onClick={closeWindow}>{closeButton()}</button>
        </div>
        <div className="sub-task__padding-form">
          <h2 className="sub-task__heading text-style_second">Новая запись
          </h2>
          <label htmlFor="subject" className="sub-task__theme-wrapper">
            <div>
              <span className="sub-task__star text-style_first">*</span>
              <span className="sub-task__input-title text-style_first">Тема</span>
            </div>
            <input type="text" name="" id="subject" className="sub-task__theme-input text-style_first" defaultValue={taskData.subject} onChange={formPlug}/>
          </label>
          <label htmlFor="status" className="sub-task__status-wrapper">
              <span className="sub-task__input-title text-style_first">Статус</span>
              <select name="" id="status" defaultValue={taskData.status} className="sub-task__status-select text-style_first">
                {selectCreator(Object.values(Status))}
              </select>
          </label>
          <label htmlFor="description" className="sub-task__description-wrapper">
            <span className="sub-task__input-title text-style_first">Описание</span>
            <input type="text" name="" id="description" className="sub-task__description-input" defaultValue={taskData.description} onChange={formPlug}/>
          </label>
          <label htmlFor="product" className="sub-task__product-wrapper">
              <span className="sub-task__input-title text-style_first">Продукт</span>
              <select name="" id="product" className="sub-task__product-select" defaultValue={taskData.product}>
                {selectCreator(Object.values(Product))}
              </select>
          </label>
          <label htmlFor="work-note" className="sub-task__work-note-wrapper">
            <div>
              <span className="sub-task__star text-style_first">*</span>
              <span className="sub-task__input-title text-style_first">Рабочие заметки</span>
            </div>
            <input type="text" name="" id="work-note" className="sub-task__note-input" defaultValue={taskData.workingNote} onChange={formPlug}/>
          </label>
          <label htmlFor="priority" className="sub-task__priority-wrapper">
              <span className="sub-task__input-title text-style_first">Приоритет</span>
              <select name="" id="priority" className="sub-task__priority-select" defaultValue={taskData.priority}>
                {selectCreator(Object.values(Priority))}
              </select>
          </label>
          <div className="sub-task__responsible-wrapper">
            <span className="sub-task__input-title text-style_first">Ответственный</span>
            <div className="sub-task__responsible-input-wrapper">
              <div className="sub-task__responsible-input">
                <div className="sub-task__responsible-fake-input">
                  {createCardsRespPersons()}
                </div>
                <button type="button" className="sub-task__clear-button" onClick={() => setResponsible([])}>
                  {clearInputIcon()}
                </button>
              </div>
              <button type="button" className="sub-task__add-button">{addIcon()}</button>
              <button type="button" className="sub-task__search-button">{searchTaskFormIcon()}</button>
            </div>
          </div>
          <div className="sub-task__team-wrapper">
            <span className="sub-task__input-title text-style_first">Группа</span>
            <div className="sub-task__team-input-wrapper">
              <div className="sub-task__team-input">
                <div className="sub-task__team-fake-input">
                  {createTeamCards()}
                </div>
                <button type="button" className="sub-task__clear-button" onClick={() => setTeam([])}>
                  {clearInputIcon()}
                </button>
              </div>
              <button type="button" className="sub-task__add-button">{addIcon()}</button>
              <button type="button" className="sub-task__search-button">{searchTaskFormIcon()}</button>
            </div>
          </div>

          <div className="sub-task__comment-wrapper">
            <label htmlFor="comment" className="sub-task__comment-wrapper">
              <span className="sub-task__input-title text-style_first">Комментарии</span>
              <input type="text" name="" id="comment" className="sub-task__comment-input" defaultValue={taskData.comment} onChange={formPlug}/>
            </label>
          </div>

          <div className="sub-task__agreeing-wrapper">
            <h3 className="sub-task__input-title text-style_first">Согласующие</h3>
            <div className="sub-task__agreeing-input-wrapper">
              <div className="sub-task__agreeing-input">
                <div className="sub-task__agreeing-fake-input">
                  {createCardsAgreeingPersons()}
                </div>
                <button type="button" className="sub-task__clear-button" onClick={() => setAgreeing([])}>
                  {clearInputIcon()}
                </button>
              </div>
              <button type="button" className="sub-task__add-button">{addIcon()}</button>
              <button type="button" className="sub-task__search-button">{searchTaskFormIcon()}</button>
            </div>
          </div>
          <div className="sub-task__opened-wrapper">
            <span className="sub-task__input-title text-style_first">Когда открыто</span>
            <Datepicker minDate={new Date("2024-01-01")} selected={openedDate} onChange={date => setOpenedDateHandler(date)} customInput={customOpenedDateInput()}/>
          </div>
          <div className="sub-task__created-wrapper">
            <span className="sub-task__input-title text-style_first">Когда создано</span>
            <Datepicker minDate={new Date("2024-01-01")} selected={closedDate} onChange={date => setClosedDateHandler(date)} customInput={customClosedDateInput()}/>
          </div>
          <div className="sub-task__pers-opened-wrapper">
            <span className="sub-task__input-title text-style_first">Кем открыто</span>
            <div className="sub-task__pers-opened-input-wrapper">
              <div className="sub-task__pers-opened-input">
                <div className="sub-task__pers-opened-fake-input">
                  {createOpenPersons()}
                </div>
                <button type="button" className="sub-task__clear-button" onClick={() => setOpenPerson([])}>
                  {clearInputIcon()}
                </button>
              </div>
              <button type="button" className="sub-task__add-button">{addIcon()}</button>
              <button type="button" className="sub-task__search-button">{searchTaskFormIcon()}</button>
            </div>
          </div>
          <div className="sub-task__pers-created-wrapper">
            <span className="sub-task__input-title text-style_first">Кем создано</span>
            <div className="sub-task__pers-created-input-wrapper">
              <div className="sub-task__pers-created-input">
                <div className="sub-task__pers-created-fake-input">
                  {createCreatePersons()}
                </div>
                <button type="button" className="sub-task__clear-button" onClick={() => setCreatePerson([])}>
                  {clearInputIcon()}
                </button>
              </div>
              <button type="button" className="sub-task__add-button">{addIcon()}</button>
              <button type="button" className="sub-task__search-button">{searchTaskFormIcon()}</button>
            </div>
          </div>
          <div className="sub-task__save-block-mobile">
            <button type="submit" className="sub-task__save-button text-style_first">Сохранить</button>
            <button type="button" className="sub-task__cancel-button" onClick={closeWindow}>Отменить</button>
          </div>
        </div>
        
      </form>
    </section>
  )
}
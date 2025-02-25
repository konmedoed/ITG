import { useState } from "react";
import { addIcon, calendarIcon, clearInputIcon, deleteAgreeingPersonIcon, searchTaskFormIcon } from "../../services/SVGs";
import { SubTask } from '../sub-task/sub-task';
import { Priority, Product, Status, TaskData } from "../../services/Types";
import { formPlug, selectCreator } from "../../services/utilities";
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './FormPage.scss';

export function FormPage({taskData}:{taskData:TaskData}){
  const [responsible, setResponsible] = useState(taskData.responsible);
  const [team, setTeam] = useState(taskData.team);
  const [agreeing, setAgreeing] = useState(taskData.agreeing);
  const [openPerson, setOpenPerson] = useState(taskData.openPerson);
  const [createPerson, setCreatePerson] = useState(taskData.createPerson);
  const [openedDate, setOpenedDate] = useState(new Date());
  const [closedDate, setClosedDate] = useState(taskData.createdDate);
  const [choosenDate, setChoosenDate] = useState(0);
  const [isShownSubTask, setIsShownSubTask] = useState(false);

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
        <button className="form-page__delete-agreeing" onClick={() => deleteAgreeing(index)}>{deleteAgreeingPersonIcon()}</button>
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
        <button className="form-page__date-button">
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
        <button className="form-page__date-button">
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

  function closeOpenSubTask():void{
    setIsShownSubTask(!isShownSubTask)
  };

  return(
    <>
      <section className="form-page">
        <form className="form-page__form" action="" onSubmit={formPlug}>
          <div className="form-page__sub-heading">
            <div className="form-page__create-wrapper">
              <p className="form-page__create-heading text-style_first">Подзадача</p>
              <button type="button" className="form-page__create-button" onClick={closeOpenSubTask}>Создать</button>
            </div>
            <div className="form-page__save-block">
              <button type="submit" className="form-page__save-button text-style_first">Сохранить</button>
              <button type="button" className="form-page__save-exit-button">Сохранить и выйти</button>
            </div>
          </div>
          <div className="form-page__padding-form">
            <div className="form-page__box-shadow-wrapper"> {/* скролл был сделан наспех, поэтому такая дикая вложенность*/}
              <div className="form-page__padding-form-scroll-wrapper">
                <h2 className="form-page__heading text-style_second">
                  {taskData.taskId} {taskData.subject}
                </h2>

                <div className="form-page__theme-status">
                  <label htmlFor="subject" className="form-page__theme-wrapper">
                    <div>
                      <span className="form-page__star text-style_first">*</span>
                      <span className="form-page__input-title text-style_first">Тема</span>
                    </div>
                    <input type="text" name="" id="subject" className="form-page__theme-input text-style_first" defaultValue={taskData.subject} onChange={formPlug}/>
                  </label>
                  <label htmlFor="status" className="form-page__status-wrapper">
                      <span className="form-page__input-title text-style_first">Статус</span>
                      <select name="" id="status" defaultValue={taskData.status} className="form-page__status-select text-style_first">
                        {selectCreator(Object.values(Status))}
                      </select>
                  </label>
                </div>

                <div className="form-page__description-product">
                  <label htmlFor="description" className="form-page__description-wrapper">
                    <span className="form-page__input-title text-style_first">Описание</span>
                    <input type="text" name="" id="description" className="form-page__description-input" defaultValue={taskData.description} onChange={formPlug}/>
                  </label>
                  <label htmlFor="product" className="form-page__product-wrapper">
                      <span className="form-page__input-title text-style_first">Продукт</span>
                      <select name="" id="product" className="form-page__product-select" defaultValue={taskData.product}>
                        {selectCreator(Object.values(Product))}
                      </select>
                  </label>
                </div>

                <div className="form-page__note-priority">
                  <label htmlFor="work-note" className="form-page__work-note-wrapper">
                    <div>
                      <span className="form-page__star text-style_first">*</span>
                      <span className="form-page__input-title text-style_first">Рабочие заметки</span>
                    </div>
                    <input type="text" name="" id="work-note" className="form-page__note-input" defaultValue={taskData.workingNote} onChange={formPlug}/>
                  </label>
                  <label htmlFor="priority" className="form-page__priority-wrapper">
                      <span className="form-page__input-title text-style_first">Приоритет</span>
                      <select name="" id="priority" className="form-page__priority-select" defaultValue={taskData.priority}>
                        {selectCreator(Object.values(Priority))}
                      </select>
                  </label>
                </div>

                <div className="form-page__responsible-team">
                  <div className="form-page__responsible-wrapper">
                    <span className="form-page__input-title text-style_first">Ответственный</span>
                    <div className="form-page__responsible-input-wrapper">
                      <div className="form-page__responsible-input">
                        <div className="form-page__responsible-fake-input">
                          {createCardsRespPersons()}
                        </div>
                        <button className="form-page__clear-button" onClick={() => setResponsible([])}>
                          {clearInputIcon()}
                        </button>
                      </div>
                      <button className="form-page__add-button">{addIcon()}</button>
                      <button className="form-page__search-button">{searchTaskFormIcon()}</button>
                    </div>
                  </div>
                  <div className="form-page__team-wrapper">
                    <span className="form-page__input-title text-style_first">Группа</span>
                    <div className="form-page__team-input-wrapper">
                      <div className="form-page__team-input">
                        <div className="form-page__team-fake-input">
                          {createTeamCards()}
                        </div>
                        <button className="form-page__clear-button" onClick={() => setTeam([])}>
                          {clearInputIcon()}
                        </button>
                      </div>
                      <button className="form-page__add-button">{addIcon()}</button>
                      <button className="form-page__search-button">{searchTaskFormIcon()}</button>
                    </div>
                  </div>
                </div>

                <div className="form-page__comment-wrapper">
                  <label htmlFor="comment" className="form-page__comment-wrapper">
                    <span className="form-page__input-title text-style_first">Комментарии</span>
                    <input type="text" name="" id="comment" className="form-page__comment-input" defaultValue={taskData.comment} onChange={formPlug}/>
                  </label>
                </div>

                <div className="form-page__agreeing-wrapper">
                  <h3 className="form-page__input-title text-style_first">Согласующие</h3>
                  <div className="form-page__agreeing-input-wrapper">
                    <div className="form-page__agreeing-input">
                      <div className="form-page__agreeing-fake-input">
                        {createCardsAgreeingPersons()}
                      </div>
                      <button className="form-page__clear-button" onClick={() => setAgreeing([])}>
                        {clearInputIcon()}
                      </button>
                    </div>
                    <button className="form-page__add-button">{addIcon()}</button>
                    <button className="form-page__search-button">{searchTaskFormIcon()}</button>
                  </div>
                </div>

                <div className="form-page__dates">
                  <div className="form-page__opened-wrapper">
                    <span className="form-page__input-title text-style_first">Когда открыто</span>
                    <Datepicker minDate={new Date("2024-01-01")} selected={openedDate} onChange={date => setOpenedDateHandler(date)} customInput={customOpenedDateInput()}/>
                  </div>
                  <div className="form-page__created-wrapper">
                    <span className="form-page__input-title text-style_first">Когда создано</span>
                    <Datepicker minDate={new Date("2024-01-01")} selected={closedDate} onChange={date => setClosedDateHandler(date)} customInput={customClosedDateInput()}/>
                  </div>
                </div>

                <div className="form-page__pers-opened-created">
                  <div className="form-page__pers-opened-wrapper">
                    <span className="form-page__input-title text-style_first">Кем открыто</span>
                    <div className="form-page__pers-opened-input-wrapper">
                      <div className="form-page__pers-opened-input">
                        <div className="form-page__pers-opened-fake-input">
                          {createOpenPersons()}
                        </div>
                        <button className="form-page__clear-button" onClick={() => setOpenPerson([])}>
                          {clearInputIcon()}
                        </button>
                      </div>
                      <button className="form-page__add-button">{addIcon()}</button>
                      <button className="form-page__search-button">{searchTaskFormIcon()}</button>
                    </div>
                  </div>
                  <div className="form-page__pers-created-wrapper">
                    <span className="form-page__input-title text-style_first">Кем создано</span>
                    <div className="form-page__pers-created-input-wrapper">
                      <div className="form-page__pers-created-input">
                        <div className="form-page__pers-created-fake-input">
                          {createCreatePersons()}
                        </div>
                        <button className="form-page__clear-button" onClick={() => setCreatePerson([])}>
                          {clearInputIcon()}
                        </button>
                      </div>
                      <button className="form-page__add-button">{addIcon()}</button>
                      <button className="form-page__search-button">{searchTaskFormIcon()}</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            
          </div>
        </form>
      </section>
      {
        isShownSubTask && <div className="form-page__sub-task" onClick={closeOpenSubTask}>
          <SubTask taskData={taskData} closeWindow={closeOpenSubTask}/>
        </div>
      }
    </>
  )
}
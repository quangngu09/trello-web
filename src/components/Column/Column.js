import React, { useState, useEffect, useRef } from 'react'
import { Container, Draggable } from "react-smooth-dnd"
import { Dropdown, Form, Button } from 'react-bootstrap'
import { cloneDeep } from 'lodash'
import './Column.scss'
import Card from 'components/Card/Card'
import ConfirmModal from 'components/Common/ConfirmModals'
import { mapOrder } from 'utilities/sort'
import { MODAL_ACTION_CONFIRM } from 'utilities/constants'
import { selectAllInlineText, saveContentAfterPressEnter } from "utilities/contentEditable"


function Column(props) {
  const { column, onCardDrop, onUpdateColumn } = props;
  const cards = mapOrder(column.cards, column.cardOrder, 'id');

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const toggleShowConfirmModal = () => setShowConfirmModal(!showConfirmModal)

  const [columnTitle, setColumnTitle] = useState('')
  const handeColumnTitleChange = (e) => setColumnTitle(e.target.value)

  const [openNewCardForm, setOpenNewCardForm] = useState(false);
  const toogleOpenNewCardForm = () => {
    setOpenNewCardForm(!openNewCardForm)
  }

  const newCardTextAreaRef = useRef(null)

  const [newCardTitle, setNewCardTitle] = useState('');
  const onNewCardTitleChange = (e) => setNewCardTitle(e.target.value);

  useEffect(() => {
    setColumnTitle(column.title)
  }, [column.title])

  useEffect(() => {
    if (newCardTextAreaRef && newCardTextAreaRef.current) {
      newCardTextAreaRef.current.focus()
      newCardTextAreaRef.current.select()
    }
  }, [openNewCardForm])

  const onConfirmModalAction = (type) => {
    if (type === MODAL_ACTION_CONFIRM) {
      //remove column
      const newColumn = {
        ...column,
        _destroy: true
      }
      onUpdateColumn(newColumn)
    }
    toggleShowConfirmModal()
  }

  const handeColumnTitleBlur = () => {
    const newColumn = {
      ...column,
      title: columnTitle
    }
    onUpdateColumn(newColumn)
  }

  const addNewCard = () => {
    if (!newCardTitle) {
      newCardTextAreaRef.current.focus();
      return
    }
    const newCardToAdd = {
      id: Math.random().toString(36).substr(2, 5),
      boardId: column.boardId,
      title: newCardTitle.trim(),
      coulumnId: column.id,
      cover: null
    }

    let newColumn = cloneDeep(column)
    newColumn.cards.push(newCardToAdd)
    newColumn.cardOrder.push(newCardToAdd.id)

    onUpdateColumn(newColumn)
    setNewCardTitle('')
    toogleOpenNewCardForm()
  }

  return (
    <div className="column">
      <header className="column-drag-handle">
        <div className="column-title">
          <Form.Control
            size="sm"
            type="text"
            className="trello-content-editable"
            value={columnTitle}
            onChange={handeColumnTitleChange}
            onBlur={handeColumnTitleBlur}
            onKeyDown={saveContentAfterPressEnter}
            onMouseDown={e => e.preventDefault()}
            onClick={selectAllInlineText}
            spellCheck="false"
          />
        </div>
        <div className="column-dropdown-actions">
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic" size="sm" className="dropdown-btn" />

            <Dropdown.Menu>
              <Dropdown.Item onClick={toogleOpenNewCardForm} >Add card</Dropdown.Item>
              <Dropdown.Item onClick={toggleShowConfirmModal}>Remove Column</Dropdown.Item>
              <Dropdown.Item>Move all cards in this column</Dropdown.Item>
              <Dropdown.Item>Archive all cards in this column</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

      </header>
      <div className="card-list">
        <Container
          groupName="col"
          orientation="vertical"
          onDrop={dropResult => onCardDrop(column.id, dropResult)}
          getChildPayload={index => cards[index]}
          dragClass="card-ghost"
          dropClass="card-ghost-drop"
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'card-drop-preview'
          }}
          dropPlaceholderAnimationDuration={200}
        >
          {cards.map((card, index) => (
            <Draggable key={index}>
              <Card card={card} />
            </Draggable>
          ))}
        </Container>

        {openNewCardForm &&
          <div className="add-card-area">
            <Form.Control
              size="sm"
              as="textarea"
              placeholder="Enter a title for this card..."
              className="textarea-enter-new-card"
              rows='3'
              ref={newCardTextAreaRef}
              value={newCardTitle}
              onChange={onNewCardTitleChange}
              onKeyDown={event => (event.key === "Enter") && addNewCard()}
            />
          </div>
        }
      </div>
      <footer>
        {openNewCardForm &&
          <div className="add-card-actions">
            <Button variant="success" size="sm" onClick={addNewCard}>Add card</Button>
            <span className="cancel-icon" onClick={toogleOpenNewCardForm}><i className="fa fa-trash icon" /></span>
          </div>
        }
        {!openNewCardForm &&
          <div className="footer-action" onClick={toogleOpenNewCardForm}>
            <i className="fa fa-plus icon" />Add another card
          </div>
        }

      </footer>

      <ConfirmModal
        show={showConfirmModal}
        onAction={onConfirmModalAction}
        title="Remove Column"
        content={`Are you sure you want to remove <strong>${column.title}</strong>! <br/> All related cards will also be removed!`}
      />

    </div>

  );
}

export default Column;

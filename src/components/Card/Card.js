import React from 'react';
import './Card.scss';

function Card(props) {
  const { card } = props;
  return (
    <li className="card-item">
      {card.cover && <img src={card.cover} onMouseDown={e => e.preventDefault()} className="card-cover" alt="" />}
      {card.title}
    </li>
  );
}

export default Card;

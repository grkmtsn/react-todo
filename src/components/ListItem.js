/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from 'react';
import { Link } from 'react-router-dom';
import { InlineIcon } from '@iconify/react';
import clockIcon from '@iconify/icons-uil/clock';
import { format } from 'date-fns';

import { categories } from '@/helpers/constants';

const ListItem = ({ todo, setSelectedTodo, handleToggleTodo }) => (
  <div className="list-item">
    <div className="checkbox-area">
      <input type="checkbox" id={todo.id} className="checkbox" checked={todo.completed} onClick={() => handleToggleTodo(todo)} />
      <label htmlFor={todo.id} className="check-label">
        <svg width="18px" height="18px" viewBox="0 0 18 18">
          <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
          <polyline points="1 9 7 14 15 4"></polyline>
        </svg>
      </label>
    </div>
    <div className="description">
      <div className="header">
        <Link to="/task">
          <label className={`${todo.completed ? 'complated' : ''}`} onClick={() => setSelectedTodo(todo.id)}>{todo.title}</label>
        </Link>
      </div>
      <div className="extra">
        <div className="date">
          <InlineIcon width="15" icon={clockIcon} />
          <span className="text">
            {format(new Date(todo.date), 'dd.MM.yyyy')}-{todo.hour}
          </span>
        </div>
        <div className="category">
          {categories[todo.category].icon}
          <span className="text">{categories[todo.category].text}</span>
        </div>
      </div>
    </div>
  </div>
);

export { ListItem };
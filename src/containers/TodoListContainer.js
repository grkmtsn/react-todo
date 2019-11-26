/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { format } from 'date-fns';

import { InlineIcon } from '@iconify/react';
import plusIcon from '@iconify/icons-uil/plus';
import annoyedAlt from '@iconify/icons-uil/annoyed-alt';

import { ListItem } from '@/components'
import { categories } from '@/helpers/constants';

import { FetchState, SelectEditTodo, ToggleTodo } from '@/redux/actions';

const TodoListContainer = (props) => {
  const { handleFetchState, todos } = props;
  const [activeCategory, setActiveCategory] = useState(categories.ALL.key);
  const [todayItems, setTodayItems] = useState([]);
  const [tomorrowItems, setTomorrowItems] = useState([]);

  useEffect(() => {
    handleFetchState();
    getByCategory(categories.ALL.key);
  }, []);

  const renderCategories = () => {
    return Object.keys(categories).map(category => (
      <div
        key={categories[category].key}
        className={`item ${activeCategory === categories[category].key ? 'active' : ''}`}
        onClick={() => getByCategory(categories[category].key)}
      >
        {categories[category].icon}
        <span className="text">{categories[category].text}</span>
      </div>
    ));
  };

  const getByCategory = category => {
    setActiveCategory(category);
    let activeItemsByCategory = todos;
    if (category !== 'ALL') {
      activeItemsByCategory = todos.filter(item => categories[item.category].key === category);
    }
    const todayItemsByCategory = activeItemsByCategory.filter(
      item => format(new Date(item.date), 'dd.MM.yyyy') === new Date().toLocaleDateString('tr-TR'),
    );
    setTodayItems(todayItemsByCategory);
    const tomorrowItemsByCategory = activeItemsByCategory.filter(
      item => format(new Date(item.date), 'dd.MM.yyyy') > new Date().toLocaleDateString('tr-TR'),
    );
    setTomorrowItems(tomorrowItemsByCategory);
  };

  const renderItems = todos => {
    const { handleToggleTodo } = props;
    return todos.map(todo => (
      <ListItem key={todo.id} todo={todo} setSelectedTodo={setSelectedTodo} handleToggleTodo={handleToggleTodo} />
    ));
  };

  const setSelectedTodo = id => {
    const { handleSelectEditTodo } = props;
    handleSelectEditTodo(id);
  }

  const renderNoItem = () => {
    return (
      <div className="list-item empty">
        {' '}
        <InlineIcon width="30" icon={annoyedAlt} />
        <span>Nothing to do!</span>
      </div>
    );
  };

  return (
    <div className="app-wrapper">
      <div className="title">
        <h2>AWESOME TODO</h2>
      </div>
      <div className="categories">{renderCategories()}</div>
      <div className="content">
        <div className="list-wrapper">
          <div className="list-label">
            <span>Today, {new Date().toLocaleDateString('tr-TR')}</span>
          </div>
          <div className="list">
            {todayItems.length > 0 ? renderItems(todayItems) : renderNoItem()}
          </div>
        </div>
        <div className="list-wrapper">
          <div className="list-label">
            <span>In the next few days</span>
          </div>
          <div className="list">
            {tomorrowItems.length > 0 ? renderItems(tomorrowItems) : renderNoItem()}
          </div>
        </div>
      </div>
      <div className="footer">
        <Link to="/task">
          <InlineIcon color="#10101E" width="30" icon={plusIcon} />
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  todos: state.todos,
});

const mapDispatchToProps = {
  handleFetchState: FetchState,
  handleSelectEditTodo: SelectEditTodo,
  handleToggleTodo: ToggleTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoListContainer);

/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-use-before-define */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { format } from 'date-fns';

import { InlineIcon } from '@iconify/react';
import plusIcon from '@iconify/icons-uil/plus';
import annoyedAlt from '@iconify/icons-uil/annoyed-alt';

import { ListItem, CategoryList, Tooltip } from '@/components';
import { categories } from '@/helpers/constants';

import { SelectEditTodo, ToggleTodo, ClearSelectedTodo, SetCategoryFilter } from '@/redux/actions';

class TodoListContainer extends Component {
  componentDidMount() {
    const { clearSelectedTodo } = this.props;
    clearSelectedTodo();
  }

  setSelectedTodo = id => {
    const { handleSelectEditTodo } = this.props;
    handleSelectEditTodo(id);
  };

  renderTodos = todos => {
    const { handleToggleTodo } = this.props;
    return todos.map(todo => (
      <ListItem
        key={todo.id}
        todo={todo}
        setSelectedTodo={this.setSelectedTodo}
        handleToggleTodo={handleToggleTodo}
      />
    ));
  };

  renderNoItem = () => {
    return (
      <div className="list-item empty">
        {' '}
        <InlineIcon width="30" icon={annoyedAlt} />
        <span>Nothing to do!</span>
      </div>
    );
  };

  render() {
    const { todos, filter, setCategoryFilter } = this.props;
    const todayTodos =
      todos &&
      todos.filter(
        item =>
          format(new Date(item.date), 'dd.MM.yyyy') === new Date().toLocaleDateString('tr-TR'),
      );
    const nextTodos =
      todos &&
      todos.filter(
        item => format(new Date(item.date), 'dd.MM.yyyy') > new Date().toLocaleDateString('tr-TR'),
      );
    return (
      <div className="app-wrapper">
        <div className="title">
          <h2>AWESOME TODO</h2>
        </div>
        <div className="categories">
          <CategoryList filter={filter} handleChange={setCategoryFilter} />
        </div>
        <div className="content">
          <div className="list-wrapper">
            <div className="list-label">
              <span>Today, {new Date().toLocaleDateString('tr-TR')}</span>
            </div>
            <div className="list">
              {todayTodos && todayTodos.length > 0
                ? this.renderTodos(todayTodos)
                : this.renderNoItem()}
            </div>
          </div>
          <div className="list-wrapper">
            <div className="list-label">
              <span>In the next few days</span>
            </div>
            <div className="list">
              {nextTodos && nextTodos.length > 0
                ? this.renderTodos(nextTodos)
                : this.renderNoItem()}
            </div>
          </div>
        </div>
        <div className="footer">
          {todos.length === 0 && <Tooltip className="tooltip" content="There is nothing todo! Add Now!" />}
          <Link to="/task">
            <InlineIcon color="#10101E" width="30" icon={plusIcon} />
          </Link>
        </div>
      </div>
    );
  }
}

// Todo Selector
const getByCategory = (todos, filter) => {
  switch (filter) {
    case categories.ALL.key:
      return todos;
    case categories.SPORT.key:
      return todos.filter(t => t.category === categories.SPORT.key);
    case categories.STUDY.key:
      return todos.filter(t => t.category === categories.STUDY.key);
    case categories.WORK.key:
      return todos.filter(t => t.category === categories.WORK.key);
    default:
      return todos;
  }
};

const mapStateToProps = state => ({
  todos: getByCategory(state.todos.list, state.filter),
  filter: state.filter,
});

const mapDispatchToProps = {
  setCategoryFilter: SetCategoryFilter,
  handleSelectEditTodo: SelectEditTodo,
  handleToggleTodo: ToggleTodo,
  clearSelectedTodo: ClearSelectedTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoListContainer);

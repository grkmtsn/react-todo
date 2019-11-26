/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { InlineIcon } from '@iconify/react';
import angleLeft from '@iconify/icons-uil/angle-left';
import trashAlt from '@iconify/icons-uil/trash-alt';
import commentExclamation from '@iconify/icons-uil/comment-exclamation';

import { categories } from '@/helpers/constants';
import { AddTodo, EditTodo, DeleteTodo } from '@/redux/actions';
import { isEmpty } from '@/helpers/storage';

const TodoActionContainer = props => {
  const { selectedTodo } = props;
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState(false);
  const [category, setCategory] = useState(
    !isEmpty(selectedTodo) ? selectedTodo.category : categories.STUDY.key,
  );
  const [values, setValues] = useState(
    !isEmpty(selectedTodo)
      ? {
          title: selectedTodo.title,
          date: selectedTodo.date,
          hour: selectedTodo.hour,
        }
      : {
          title: '',
          date: new Date().toISOString().substr(0, 10),
          hour: `${new Date().getHours()}:${new Date().getMinutes()}`,
        },
  );

  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = () => {
    const { handleAddTodo, handleEditTodo, history } = props;
    const isValid = validateTitle(values.title);
    if (isValid) {
      if (isEmpty(selectedTodo)) {
        const body = {
          title: values.title,
          category,
          date: values.date,
          hour: values.hour,
        };
        handleAddTodo(body);
      } else {
        const modifiedTodo = {
          ...selectedTodo,
          title: values.title,
          category,
          date: values.date,
          hour: values.hour,
        };
        handleEditTodo(modifiedTodo);
      }
      history.goBack();
    } else {
      setError(true);
    }
  };

  const handleDelete = () => {
    const {
      selectedTodo: { id },
      handleDeleteTodo,
      history,
    } = props;
    handleDeleteTodo(id);
    history.goBack();
  };

  const renderCategories = () => {
    return Object.keys(categories).map(key => {
      if (categories[key].key !== 'ALL') {
        return (
          <div
            key={categories[key].key}
            className={`item ${category === categories[key].key ? 'active' : ''}`}
            onClick={() => setCategory(categories[key].key)}
          >
            {categories[key].icon}
            <span className="text">{categories[key].text}</span>
          </div>
        );
      }
      return null;
    });
  };

  const renderConfirm = () => (
    <div>
      <div className="backdrop" onClick={closeConfirm}></div>
      <div className="confirm">
        <InlineIcon className="icon" color="#ff7a7a" width="70" icon={commentExclamation} />
        <div className="title">Are you sure?</div>
        <div className="actions">
          <button type="button" onClick={closeConfirm} className="btn-close">
            Never Mind
          </button>
          <button type="button" onClick={onConfirm} className="btn-danger">
            Yes
          </button>
        </div>
      </div>
    </div>
  );

  const onConfirm = () => {
    setVisible(false);
    handleDelete();
  };

  const closeConfirm = () => {
    setVisible(false);
  };

  const validateTitle = value => {
    return value.trim() !== '';
  };

  return (
    <div className="app-wrapper">
      <div className="title">
        <Link to="/">
          <InlineIcon color="#FFF" width="50" icon={angleLeft} className="btn-back" />
        </Link>
        <h2>{!isEmpty(selectedTodo) ? 'EDIT TODO' : 'NEW TODO'}</h2>
        {!isEmpty(selectedTodo) && (
          <button
            className="btn-delete"
            type="button"
            onClick={() => {
              setVisible(true);
            }}
          >
            <InlineIcon color="#ff7a7a" width="30" icon={trashAlt} />
          </button>
        )}
      </div>
      <div className="form-group">
        <div className="form-label">
          <span>Description</span>
        </div>
        <div className="textarea">
          <textarea rows="3" value={values.title} name="title" onChange={handleInputChange} />
        </div>
        {error && <div className="error-field">Description is required</div>}
      </div>
      <div className="form-group">
        <div className="form-label">
          <span>Choose a category</span>
        </div>
        <div className="categories select">{renderCategories()}</div>
      </div>
      <div className="form-group">
        <div className="form-label">
          <span>Choose a date and hour</span>
        </div>
        <div className="date-fields">
          <input type="date" name="date" value={values.date} onChange={handleInputChange} />
          <input type="time" name="hour" value={values.hour} onChange={handleInputChange} />
        </div>
      </div>
      <button type="button" className="btn-add" onClick={handleSubmit}>
        {!isEmpty(selectedTodo) ? 'SAVE TODO' : 'ADD TODO'}
      </button>
      {visible && renderConfirm()}
    </div>
  );
};

const mapStateToProps = state => ({
  selectedTodo: state.todos.selectedTodo,
});

const mapDispatchToProps = {
  handleAddTodo: AddTodo,
  handleEditTodo: EditTodo,
  handleDeleteTodo: DeleteTodo,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TodoActionContainer));

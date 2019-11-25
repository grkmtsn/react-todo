import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { InlineIcon } from '@iconify/react';
import flaskIcon from '@iconify/icons-uil/flask';
import trophyIcon from '@iconify/icons-uil/trophy';
import bagIcon from '@iconify/icons-uil/bag';
import clockIcon from '@iconify/icons-uil/clock';
import plusIcon from '@iconify/icons-uil/plus';
import listUl from '@iconify/icons-uil/list-ul';
import annoyedAlt from '@iconify/icons-uil/annoyed-alt';

const TodoListContainer = () => {
  const items = [
    {
      id: 1,
      title: 'Todo 1',
      category: 'SPORT',
      date: '28.11.2019',
      hour: '23:59',
      completed: false,
    },
    {
      id: 2,
      title: 'Todo 2',
      category: 'SPORT',
      date: '26.11.2019',
      hour: '23:59',
      completed: false,
    },
    {
      id: 4,
      title: 'Todo 2',
      category: 'WORK',
      date: '26.11.2019',
      hour: '23:59',
      completed: false,
    },
    {
      id: 5,
      title: 'Todo 2',
      category: 'STUDY',
      date: '26.11.2019',
      hour: '23:59',
      completed: false,
    },
    {
      id: 3,
      title: 'Todo 3',
      category: 'WORK',
      date: '27.11.2019',
      hour: '23:59',
      completed: false,
    },
  ];

  const categories = {
    ALL: {
      key: 'ALL',
      text: 'ALL',
      icon: <InlineIcon color="#48496B" width="20" icon={listUl} />,
    },
    STUDY: {
      key: 'STUDY',
      text: 'Study',
      icon: <InlineIcon color="#FBA948" width="20" icon={flaskIcon} />,
    },
    SPORT: {
      key: 'SPORT',
      text: 'Sport',
      icon: <InlineIcon color="#758EEE" width="20" icon={trophyIcon} />,
    },
    WORK: {
      key: 'WORK',
      text: 'Work',
      icon: <InlineIcon color="#37FC7A" width="20" icon={bagIcon} />,
    },
  };

  const [activeCategory, setActiveCategory] = useState('ALL');
  const [todayItems, setTodayItems] = useState([]);
  const [tomorrowItems, setTomorrowItems] = useState([]);

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
    let activeItemsByCategory = items;
    if (category !== 'ALL') {
      activeItemsByCategory = items.filter(item => categories[item.category].key === category);
    }
    const todayItemsByCategory = activeItemsByCategory.filter(
      item => item.date === new Date().toLocaleDateString(),
    );
    const tomorrowItemsByCategory = activeItemsByCategory.filter(
      item => item.date > new Date().toLocaleDateString(),
    );
    setTodayItems(todayItemsByCategory);
    setTomorrowItems(tomorrowItemsByCategory);
  };

  const renderItems = items => {
    return items.map(item => (
      <div className="list-item">
        <div className="checkbox-area">
          <input type="checkbox" id={item.id} className="checkbox" />
          <label htmlFor={item.id} className="check-label">
            <svg width="18px" height="18px" viewBox="0 0 18 18">
              <path d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z"></path>
              <polyline points="1 9 7 14 15 4"></polyline>
            </svg>
          </label>
        </div>
        <div className="description">
          <div className="header">
            <label htmlFor={item.id}>{item.title}</label>
          </div>
          <div className="extra">
            <div className="date">
              <InlineIcon width="15" icon={clockIcon} />
              <span>
                {item.date}-{item.hour}
              </span>
            </div>
            <div className="category">
              {categories[item.category].icon}
              <span className="text">{categories[item.category].text}</span>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  const renderNoItem = () => {
    return (
      <div className="list-item empty">
        {' '}
        <InlineIcon width="30" icon={annoyedAlt} />
        <span>Nothing to do!</span>
      </div>
    );
  };

  useEffect(() => {
    getByCategory('ALL');
  }, []);

  return (
    <div className="app-wrapper">
      <div className="title">
        <h2>AWSOME TODO</h2>
      </div>
      <div className="categories">{renderCategories()}</div>
      <div className="content">
        <div className="list-wrapper">
          <div className="list-label">
            <span>Today, {new Date().toLocaleDateString()}</span>
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
        <Link>
          <InlineIcon color="#10101E" width="30" icon={plusIcon} />
        </Link>
      </div>
    </div>
  );
};

export { TodoListContainer };

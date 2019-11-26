/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from 'react';
import { categories } from '@/helpers/constants';

const CategoryList = ({ filter, handleChange }) => {
  return Object.keys(categories).map(category => (
    <div
      key={categories[category].key}
      className={`item ${filter === categories[category].key ? 'active' : ''}`}
      onClick={() => {
        handleChange(categories[category].key);
      }}
    >
      {categories[category].icon}
      <span className="text">{categories[category].text}</span>
    </div>
  ));
};

export { CategoryList };

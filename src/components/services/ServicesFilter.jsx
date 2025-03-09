import React from 'react';
import '../../styles/services/servicesFilter.css';

export const ServicesFilter = ({ categories, onCategorySelect, selectedCategory }) => {
  return (
    <div className="services-filter-container">
      <div className="services-filter-wrapper">
        {categories.map(category => (
          <button
            key={category.id}
            className={`filter-category ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => onCategorySelect(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

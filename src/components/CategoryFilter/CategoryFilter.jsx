import { useEffect, useState } from 'react';
import { getCategories } from '../../services/api';
import './CategoryFilter.css';

const CategoryFilter = ({ selectedCategory, onSelectCategory }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) return <div className="categories-loading">Cargando categorías...</div>;

  return (
    <div className="category-filter">
      <button
        className={`category-btn ${!selectedCategory ? 'active' : ''}`}
        onClick={() => onSelectCategory(null)}
      >
        Todas
      </button>
      {categories.map((cat) => (
        <button
          key={cat.slug}
          className={`category-btn ${selectedCategory === cat.slug ? 'active' : ''}`}
          onClick={() => onSelectCategory(cat.slug)}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
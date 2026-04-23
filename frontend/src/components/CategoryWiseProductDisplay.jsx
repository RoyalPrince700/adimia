import { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct';
import VerticalCard from './VerticalCard';

const CategoryWiseProductDisplay = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);
    setData(categoryProduct?.data);
  }, [category]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="relative mx-auto my-6 max-w-7xl px-0">
      {heading ? (
        <h2 className="mb-6 text-lg font-semibold tracking-[-0.02em] text-slate-950 sm:text-xl">
          {heading}
        </h2>
      ) : null}
      <VerticalCard loading={loading} data={data.slice(0, 5)} />
    </div>
  );
};

CategoryWiseProductDisplay.propTypes = {
  category: PropTypes.string,
  heading: PropTypes.string,
};

export default CategoryWiseProductDisplay;

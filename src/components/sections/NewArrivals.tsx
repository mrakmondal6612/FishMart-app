import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ image, title, category, price, id }) => {
  return (
    <Link to={`/product/${id}`} className="w-full bg-white mx-auto pb-[17px] max-md:mt-[15px] cursor-pointer transform transition-transform duration-300 hover:scale-105">
      <div className="bg-[rgba(255,235,231,1)] flex items-center justify-center max-md:mr-[5px]">
        <img
          src={image}
          className="aspect-[0.89] object-contain w-full max-w-[355px] self-stretch min-w-60 flex-1 shrink basis-[0%] max-h-[474px] my-auto"
          alt={title}
        />
      </div>
      <div className="flex flex-col text-[15px] text-[#58595B] font-normal px-2.5">
        <div className="text-[#58595B] text-sm font-bold leading-[1.1] border-b-[var(--color-black-13,rgba(0,0,0,0.13)] pt-[7px] pb-[4px] border-b-[1px] border-solid">
          {title}
        </div>
        <div className="text-[#737577] text-[15px] font-normal leading-[22.5px]">
          {category}
        </div>
        <div className="text-[#58595B] text-[15px] font-normal leading-[22.5px]">
          {price}
        </div>
      </div>
    </Link>
  );
};

export const NewArrivals = () => {
  const products = [
    {
      id: 'new-1',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=400&h=400',
      title: 'Cardinal Tetra - School Pack',
      category: 'Tetras',
      price: '₹ 1299'
    },
    {
      id: 'new-2',
      image: 'https://images.unsplash.com/photo-1498855926480-d98e83099315?auto=format&fit=crop&w=400&h=400',
      title: 'Red Tiger Oscar',
      category: 'Cichlids',
      price: '₹ 1699'
    },
    {
      id: 'new-3',
      image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=400&h=400',
      title: 'Blue Discus Fish Pair',
      category: 'Discus',
      price: '₹ 2049'
    },
    {
      id: 'new-4',
      image: 'https://images.unsplash.com/photo-1568421552031-5b0015ceb16e?auto=format&fit=crop&w=400&h=400',
      title: 'Gold Pleco',
      category: 'Plecos',
      price: '₹ 1499'
    }
  ];

  return (
    <section className="w-full mt-10">
      <h2 className="text-[#222828] text-center text-[28px] font-bold leading-[35px] mb-8">
        New Arrivals
      </h2>
      <div className="self-stretch flex w-full flex-col items-stretch pl-[7px] max-md:pl-5">
        <div className="gap-5 flex max-md:flex-col max-md:items-stretch">
          {products.map((product, index) => (
            <div key={index} className="w-3/12 max-md:w-full max-md:ml-0">
              <ProductCard {...product} />
            </div>
          ))}
        </div>
        <Link to="/shop" className="text-neutral-50 self-center rounded bg-[rgba(217,32,48,1)] gap-2.5 text-base font-medium mt-6 px-12 py-4 hover:bg-[rgba(217,32,48,0.9)] transition-colors">
          View All Products
        </Link>
      </div>
    </section>
  );
};

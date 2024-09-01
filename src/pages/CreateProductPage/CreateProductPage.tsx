import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../features/products/productsSlice';

interface FormValues {
  title: string;
  description: string;
  image: string;
}

const CreateProductPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data: FormValues) => {
    const newProduct = {
      id: Date.now(),
      ...data,
      liked: false,
    };

    // Получаем существующие продукты из localStorage
    const storedProducts = JSON.parse(localStorage.getItem('products') || '[]');

    // Добавляем новый продукт
    const updatedProducts = [...storedProducts, newProduct];

    // Сохраняем обновленный массив продуктов в localStorage
    localStorage.setItem('products', JSON.stringify(updatedProducts));

    // Обновляем Redux Store
    dispatch(addProduct(newProduct));

    // Перенаправляем пользователя на главную страницу
    navigate('/');
  };

  return (
    <div className="create-product-page">
      <h1>Create New Product</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Title"
          {...register('title', {
            required: 'Title is required',
            minLength: {
              value: 3,
              message: 'Title must be at least 3 characters long',
            },
            maxLength: {
              value: 50,
              message: 'Title cannot exceed 50 characters',
            },
          })}
        />
        {errors.title && <p>{errors.title.message}</p>}

        <textarea
          placeholder="Description"
          {...register('description', {
            required: 'Description is required',
            minLength: {
              value: 10,
              message: 'Description must be at least 10 characters long',
            },
            maxLength: {
              value: 500,
              message: 'Description cannot exceed 500 characters',
            },
          })}
        />
        {errors.description && <p>{errors.description.message}</p>}

        <input
          type="text"
          placeholder="Image URL"
          {...register('image', {
            required: 'Image URL is required',
            pattern: {
              value: /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/i,
              message: 'Invalid URL format or unsupported image format',
            },
          })}
        />
        {errors.image && <p>{errors.image.message}</p>}

        <button type="submit">Create Product</button>
      </form>
      <button onClick={() => navigate('/')}>Back to Products</button>
    </div>
  );
};

export default CreateProductPage;
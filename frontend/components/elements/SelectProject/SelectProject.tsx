import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/app/storeContext/StoreContext';
import ContentLoader from 'react-content-loader';
import Select from 'react-select';
import styles from './SelectProject.module.scss';

const SelectProject = observer(() => {
  const store = useStore();
  // получаем фильтр проектов
  const projects = store.filters?.data.projects || [];
  const { isLoading } = store;

  // при обновлении store
  useEffect(() => {
    // создаем новый объект, используя строку запроса из текущего url
    const params = new URLSearchParams(window.location.search);
    // извлекаем все значения params и преобразуем из строки в число
    const projectsParam = params.getAll('f[projects][]').map(Number);
    // если есть передаем в метод добавления в фильтр
    if (projectsParam.length > 0) {
      store.applyFilter({ projects: projectsParam });
    }
  }, [store]);

  // функция изменения
  const handleChange = (selectedOptions: any) => {
    const selectedValues = selectedOptions
      ? selectedOptions.map((option: any) => option.value)
      : [];
    // передаем в метод добавления в фильтр
    store.applyFilter({ projects: selectedValues });
    // вызываем метод обновление ссылки в браузере
    store.updateURL();
  };

  // записываем в Select label id сохраняем в value
  const projectOptions = projects.map((project) => ({
    value: project.id,
    label: project.title,
  }));

  const customStyles = {
    control: (provided: any) => ({
      ...provided,
      minHeight: 'var(--input-height)',
      backgroundColor: 'transparent',
      border: '1px solid rgba(30, 31, 34, 0.7490196078)',
      color: '#040306',
      paddingInline: '25px',
      minWidth: '430px',
      width: '100%',
      borderRadius: 'var(--border-radius)',
      display: 'flex',
      alignItems: 'center',
      '@media (max-width: 800px)': {
        minWidth: 'auto',
      },
    }),
    menu: (provided: any) => ({
      ...provided,
      width: '100%',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#ddd' : '#fff',
      color: state.isSelected ? '#040306' : '#000',
    }),
  };

  return (
    <div className={styles.selectProjectContainer}>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="project-select" className={styles.selectProjectLabel}>
        Проект
      </label>
      {isLoading ? (
        <ContentLoader
          speed={2}
          width="100%"
          height="55px"
          viewBox="0 0 430 55"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="0" y="0" rx="10" ry="10" width="430" height="55" />
        </ContentLoader>
      ) : (
        <Select
          isMulti
          name="project-select"
          id="project-select"
          options={projectOptions}
          classNamePrefix="select"
          onChange={handleChange}
          styles={customStyles}
        />
      )}
    </div>
  );
});

export default SelectProject;

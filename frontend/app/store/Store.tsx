/* eslint-disable */

'use client';

import { makeAutoObservable } from 'mobx';
import { FiltersData } from '@/app/models/Filters/FiltersData';
import { FlatsData } from '@/app/models/Flats/FlatsData';
import FilterService from '../services/FilterService';
import FlatsService from '../services/FlatsService';

class Store {
  filters: FiltersData | null = null;
  flats: FlatsData | null = null;
  isLoading: boolean = false;
  isLoadingCard: boolean = false;

  // Храним массивы фильтров
  selectedFilters: {
    projects?: number[];
    rooms?: number[];
    square?: number[];
    price?: number[];
  } = {};

  selectedRoom: number[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async fetchFilters() {
    this.setLoading(true);
    try {
      const response = await FilterService.getFilters();
      this.setFilters(response.data);
    } catch (error) {
      // console.error('Error:', error); // Убрано, чтобы избежать консольных команд
    } finally {
      this.setLoading(false);
    }
  }

  // Метод получения квартир по умолчанию - первая квартира
  async fetchFlats(page: number = 1) {
    this.setLoadingCard(true);
    try {
      const params = this.generateURLParams(page);
      const url = `/flats?${params.toString()}`;
      const response = await FlatsService.getFlats(url);
      this.setFlats(response.data);
    } catch (error) {
      // console.error('Error fetching flats:', error); // Убрано, чтобы избежать консольных команд
    } finally {
      this.setLoadingCard(false);
    }
  }

  // Метод для обновления фильтра после
  async updateFiltersBasedOnSelection() {
    try {
      const params = this.generateURLParams();
      const url = `/filters?${params.toString()}`;
      const response = await FilterService.getUpdateFilters(url);
      this.setFilters(response.data);
    } catch (error) {
      // console.error('Error updating filters:', error); // Убрано, чтобы избежать консольных команд
    }
  }

  setFilters(filters: FiltersData) {
    this.filters = filters;
  }

  // Обновление Flats
  setFlats(flats: FlatsData) {
    this.flats = flats;
  }

  setLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  setLoadingCard(isLoadingCard: boolean) {
    this.isLoadingCard = isLoadingCard;
  }

  setSelectedRoom(rooms: number[]) {
    this.selectedRoom = rooms;
  }

  // Метод добавления в фильтр
  applyFilter(filter: {
    projects?: number[];
    rooms?: number[];
    square?: number[];
    price?: number[];
  }) {
    // Добавление выбранных фильтров к имеющимся
    this.selectedFilters = { ...this.selectedFilters, ...filter };
    // Вызываем функцию обновления фильтров, которые подстраиваются под выбранный фильтр
    this.updateFiltersBasedOnSelection();
    // Получаем квартиры
    this.fetchFlats();
  }

  // Метод очистки всех фильтров
  clearFilters() {
    this.selectedFilters = {};
    this.filters = null;
    this.flats = null;
    // Чистим выбранные комнаты
    this.selectedRoom = [];
    this.fetchFilters();
    // Очищаем полученные квартиры
    this.fetchFlats();
    // Очищаем URL
    this.updateURL();
  }

  // Обновление ссылки в браузере
  updateURL() {
    // Генерация параметров
    const params = this.generateURLParams();
    // Обновляем адресную строку браузера
    window.history.replaceState(null, '', `?${params.toString()}`);
  }

  // Генерация параметров
  generateURLParams(page: number = 1): URLSearchParams {
    const params = new URLSearchParams();

    if (this.selectedFilters.projects) {
      this.selectedFilters.projects.forEach((project) => {
        params.append('f[projects][]', String(project));
      });
    }

    if (this.selectedFilters.rooms) {
      this.selectedFilters.rooms.forEach((room) => {
        params.append('f[rooms][]', String(room));
      });
    }

    if (this.selectedFilters.square) {
      params.append('f[square][min]', String(this.selectedFilters.square[0]));
      params.append('f[square][max]', String(this.selectedFilters.square[1]));
    }

    if (this.selectedFilters.price) {
      params.append('f[price][min]', String(this.selectedFilters.price[0]));
      params.append('f[price][max]', String(this.selectedFilters.price[1]));
    }

    params.append('page', String(page));
    return params;
  }
}

const store = new Store();

export default store;

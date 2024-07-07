import { makeAutoObservable } from "mobx";
import FilterService from "../services/FilterService";
import FlatsService from "../services/FlatsService";
import { FiltersData } from "@/app/models/Filters/FiltersData";
import { FlatsData } from "@/app/models/Flats/FlatsData";

class Store {
  filters: FiltersData | null = null;
  flats: FlatsData | null = null;
  isLoading: boolean = false;
  isLoadingCard: boolean = false;
  // храним массивы фильтров
  selectedFilters: { projects?: number[]; rooms?: number[]; square?: number[]; price?: number[] } = {};
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
      console.error("Error:", error);
    } finally {
      this.setLoading(false);
    }
  }

  // метод получение квартир по дефолту первая квартира
  async fetchFlats(page: number = 1) {
    this.setLoadingCard(true);
    try {
      const params = this.generateURLParams(page);
      const url = `/flats?${params.toString()}`;

      console.log("Fetching flats with URL:", url);

      const response = await FlatsService.getFlats(url);
      this.setFlats(response.data);
    } catch (error) {
      console.error("Error fetching flats:", error);
    } finally {
      this.setLoadingCard(false);
    }
  }

  // метод для обновления фильтра после
  // async updateFiltersBasedOnSelection() {
  //   this.setLoading(true);
  //   try {
  //     const params = this.generateURLParams();
  //     const url = `/filters?${params.toString()}`;
  //     const response = await FilterService.getUpdateFilters(url);
  //     this.setFilters(response.data);
  //   } catch (error) {
  //     console.error("Error updating filters:", error);
  //   } finally {
  //     this.setLoading(false);
  //   }
  // }


  setFilters(filters: FiltersData) {
    this.filters = filters;
  }

  // обновление Flats
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
  
  // метод добавления в фильтр
  applyFilter(filter: { projects?: number[]; rooms?: number[]; square?: number[]; price?: number[] }) {
    // добавление выбранных фильтров к имеющимся
    this.selectedFilters = { ...this.selectedFilters, ...filter };
    // вызываем функцию обновления фильтров которые подстраиваются под выбранный фильтр 
    // this.updateFiltersBasedOnSelection();
    // получаем квартиры 
    this.fetchFlats();
  }

  // метод очистки всех фильтров
  clearFilters() {
    this.selectedFilters = {};
    this.filters = null;
    this.flats = null;
    // чистим выбранные комнаты 
    this.selectedRoom = [];
    this.fetchFilters();
    //очищаем полученные кваритры  
    this.fetchFlats();
    // очищаем url 
    this.updateURL();
  }

  // обновление ссылки в браузере
  updateURL() {
    // генерация параметров 
    const params = this.generateURLParams();
    // обновляем адресную строку браузера 
    window.history.replaceState(null, "", `?${params.toString()}`);
  }

  // генерация параметров
  generateURLParams(page: number = 1): URLSearchParams {
    const params = new URLSearchParams();
  
    if (this.selectedFilters.projects) {
      this.selectedFilters.projects.forEach((project) => {
        params.append("f[projects][]", String(project));
      });
    }
  
    if (this.selectedFilters.rooms) {
      this.selectedFilters.rooms.forEach((room) => {
        params.append("f[rooms][]", String(room));
      });
    }
  
    if (this.selectedFilters.square) {
      params.append("f[square][min]", String(this.selectedFilters.square[0]));
      params.append("f[square][max]", String(this.selectedFilters.square[1]));
    }
  
    if (this.selectedFilters.price) {
      params.append("f[price][min]", String(this.selectedFilters.price[0]));
      params.append("f[price][max]", String(this.selectedFilters.price[1]));
    }
  
    params.append("page", String(page));
    return params;
  }
}

const store = new Store();

export default store;

import { FiltersData } from '@/app/models/Filters/FiltersData';
import { AxiosResponse } from 'axios';
import $api from '../http/index';

export default class FilterService {
  // получение всех фильтров
  static getFilters(): Promise<AxiosResponse<FiltersData>> {
    return $api.get<FiltersData>('/filters');
  }

  // получение филтров которые подстраиваются под выбранный фильтр
  static getUpdateFilters(url: string): Promise<AxiosResponse<FiltersData>> {
    return $api.get<FiltersData>(url);
  }
}

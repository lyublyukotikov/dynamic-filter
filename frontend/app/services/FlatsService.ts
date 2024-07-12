import { AxiosResponse } from 'axios';
import $api from '../http/index';
import { FlatsData } from '../models/Flats/FlatsData';

export default class FlatsService {
  static getFlats(url: string): Promise<AxiosResponse<FlatsData>> {
    return $api.get<FlatsData>(url);
  }
}

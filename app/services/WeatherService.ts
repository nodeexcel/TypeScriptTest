import * as config from '@config/config';
import axios from 'axios';

export default class WeatherService {
    static async readById(id: string): Promise<any> {
        try {
            const Weather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=${id}&appid=${config.WEATHER_KEY}`);
            return Weather.data;
        } catch (error) {
            console.log(error)
        }
    }
}

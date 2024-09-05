<template>
    <section class="vh-100">
        <div class="container py-5">
            <div class="row d-flex justify-center items-center h-100">
                <div class="col-md-9 col-lg-7 col-xl-5">
                    <div
                        id="wrapper-bg"
                        class="card text-white bg-image shadow-4-strong"
                        :style="{ backgroundImage: bgImageUrl }"
                    >
                        <div class="card-header p-4 border-0 text-center mb-3">
                            <p class="h2 mb-1">{{ weatherData.name }}</p>
                            <p class="mb-1">{{ weatherData.description }}</p>
                            <p class="display-1 mb-1">{{ weatherData.temp }}°C</p>
                            <span>Pressure: {{ weatherData.pressure }} hPa</span>
                            <span class="mx-2">|</span>
                            <span>Humidity: {{ weatherData.humidity }}%</span>
                        </div>

                        <div class="card-body p-4 border-t border-b mb-2">
                            <div class="row text-center">
                                <div v-for="(hour, index) in hourlyForecast" :key="index" class="col-2">
                                    <strong class="d-block mb-2">{{ hour.time }}</strong>
                                    <img :src="hour.icon" class="" alt="" />
                                    <strong class="d-block">{{ hour.temp }}°C</strong>
                                </div>
                            </div>
                        </div>

                        <div class="card-body px-5">
                            <div v-for="(day, index) in dailyForecast" :key="index" class="row align-items-center">
                                <div class="col-lg-6">
                                    <strong>{{ day.label }}</strong>
                                </div>
                                <div class="col-lg-2 text-center">
                                    <img :src="day.icon" class="w-100" alt="" />
                                </div>
                                <div class="col-lg-4 text-right">
                                    <span>{{ day.temp }}°C</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    props: {
        location: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            weatherData: {
                name: "",
                description: "",
                temp: "",
                pressure: "",
                humidity: "",
            },
            hourlyForecast: [],
            dailyForecast: [],
            bgImageUrl: "",
            apiKey: "dbb76c5d98d5dbafcb94441c6a10236e",
            apiUrl: "https://api.openweathermap.org/data/2.5/onecall",
        };
    },
    mounted() {
        this.fetchWeatherData();
    },
    watch: {
        location: {
            immediate: true,
            handler(newLocation) {
                console.log("✌️newLocation --->", newLocation);
                this.fetchWeatherData();
            },
        },
    },

    methods: {
        async fetchWeatherData() {
            try {
                const response = await fetch(
                    `${this.apiUrl}?lat=${this.location.lat}&lon=${this.location.lon}&units=metric&exclude=minutely,alerts&appid=${this.apiKey}`
                );
                const data = await response.json();

                this.weatherData = {
                    name: this.location.location_name,
                    description: data.current.weather[0].description,
                    temp: Math.round(data.current.temp),
                    pressure: data.current.pressure,
                    humidity: data.current.humidity,
                };

                this.hourlyForecast = data.hourly.slice(0, 6).map((hour, index) => {
                    const time = new Date().getHours() + index;
                    return {
                        time: time > 24 ? time - 24 : time,
                        temp: Math.round(hour.temp),
                        icon: `http://openweathermap.org/img/wn/${hour.weather[0].icon}.webp`,
                    };
                });

                this.dailyForecast = [
                    {
                        label: "Today",
                        temp: Math.round(data.daily[0].temp.day),
                        icon: `http://openweathermap.org/img/wn/${data.daily[0].weather[0].icon}.webp`,
                    },
                    {
                        label: "Tomorrow",
                        temp: Math.round(data.daily[1].temp.day),
                        icon: `http://openweathermap.org/img/wn/${data.daily[1].weather[0].icon}.webp`,
                    },
                    {
                        label: "Day after Tomorrow",
                        temp: Math.round(data.daily[2].temp.day),
                        icon: `http://openweathermap.org/img/wn/${data.daily[2].weather[0].icon}.webp`,
                    },
                ];

                const main = data.current.weather[0].main;
                this.bgImageUrl = this.selectBackgroundImage(main);
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        },
        selectBackgroundImage(mainWeather) {
            const backgrounds = {
                Snow: "url('https://mdbgo.io/ascensus/mdb-advanced/img/snow.gif')",
                Clouds: "url('https://mdbgo.io/ascensus/mdb-advanced/img/clouds.gif')",
                Fog: "url('https://mdbgo.io/ascensus/mdb-advanced/img/fog.gif')",
                Rain: "url('https://mdbgo.io/ascensus/mdb-advanced/img/rain.gif')",
                Clear: "url('https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif')",
                Thunderstorm: "url('https://mdbgo.io/ascensus/mdb-advanced/img/thunderstorm.gif')",
                default: "url('https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif')",
            };
            return backgrounds[mainWeather] || backgrounds.default;
        },
    },
};
</script>

<style scoped>
/* Add necessary Tailwind CSS classes */
</style>

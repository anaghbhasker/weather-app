<template>
    <div>
        <nav class="bg-blue-600 p-4 flex items-center justify-between">
            <div class="relative">
                <button
                    @click="toggleDropdown"
                    class="bg-white text-blue-600 font-bold py-2 px-4 rounded-md shadow-md focus:outline-none"
                >
                    Locations
                </button>
                <div
                    v-if="isDropdownOpen"
                    class="absolute left-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg"
                >
                    <ul>
                        <li
                            v-for="location in locations"
                            :key="location.lat"
                            class="p-2 hover:bg-gray-100 cursor-pointer"
                            @click="selectLocation(location)"
                        >
                            {{ formatLocationName(location) }}
                        </li>
                    </ul>
                </div>
            </div>

            <button
                @click="logout"
                class="bg-red-600 text-white font-bold py-2 px-4 rounded-md shadow-md focus:outline-none"
            >
                Logout
            </button>
        </nav>

        <main class="p-4">
            <div v-if="selectedLocation" class="mt-4">
                <WeatherPage :location="selectedLocation" />
            </div>
        </main>
    </div>
</template>

<script>
import { GET_LOCATION_BY_USER } from "@/server/graph";
import WeatherPage from "./WeatherPage.vue";

export default {
    components: {
        WeatherPage,
    },
    data() {
        return {
            locations: [],
            isDropdownOpen: false,
            selectedLocation: null,
        };
    },
    mounted() {
        this.getLocations();
    },
    methods: {
        async getLocations() {
            const userId = localStorage.getItem("sqadra");
            try {
                const { data } = await this.$apollo.query({
                    query: GET_LOCATION_BY_USER,
                    context: {
                        headers: {
                            authorization: userId ? userId : "",
                        },
                    },
                });
                this.locations = data.userDetail.user.locations;
                const currentLocation = data.userDetail.user.locations.find((location) => location.type === "CURRENT");
                if (currentLocation) {
                    this.selectedLocation = currentLocation;
                }
            } catch (error) {
                console.log("✌️error --->", error);
            }
        },

        toggleDropdown() {
            this.isDropdownOpen = !this.isDropdownOpen;
        },
        selectLocation(location) {
            this.selectedLocation = location;
            this.isDropdownOpen = false;
        },
        logout() {
            localStorage.removeItem("sqadra");
            this.$router.push("/");
        },
        formatLocationName(location) {
            return location.type === "CURRENT" ? "Current" : location.location_name;
        },
    },
};
</script>

<style scoped></style>

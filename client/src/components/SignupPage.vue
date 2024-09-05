<template>
    <div class="min-h-screen flex flex-col justify-center items-center bg-gray-100">
        <div class="mb-8">
            <img
                src="../assets/7477790.png"
                alt="Placeholder Image"
                class="w-32 h-32 object-cover rounded-full shadow-lg"
            />
        </div>

        <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h2 class="text-2xl font-bold mb-6 text-center">Sign Up</h2>

            <form @submit.prevent="handleSubmit">
                <div class="mb-4">
                    <label for="username" class="block text-gray-700 text-sm font-bold mb-2">Username</label>
                    <input
                        type="text"
                        id="username"
                        v-model="username"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your username"
                        required
                    />
                </div>

                <div class="mb-4">
                    <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        v-model="email"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email"
                        required
                    />
                </div>

                <div class="mb-4">
                    <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input
                        type="password"
                        id="password"
                        v-model="password"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your password"
                        required
                    />
                </div>

                <div class="mb-4">
                    <label for="places" class="block text-gray-700 text-sm font-bold mb-2">Select Places</label>
                    <MultiSelect
                        v-model="selectedPlaces"
                        :options="places"
                        optionLabel="location_name"
                        filter
                        placeholder="Select Places"
                        :maxSelectedLabels="3"
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        @search="fetchPlaces"
                    />
                </div>

                <div class="flex items-center justify-center">
                    <button
                        type="submit"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Sign up
                    </button>
                </div>
            </form>
            <div class="mt-4 text-center">
                <a href="#" class="text-blue-500 hover:text-blue-700" @click.prevent="redirectToLogin">
                    Already have an account? Login
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import { SIGN_UP_MUTATION } from "@/server/graph";
import Swal from "sweetalert2";

export default {
    data() {
        return {
            places: [
                {
                    location_name: "Bengaluru",
                    type: "TEMP",
                    lat: 12.971599,
                    lon: 77.594566,
                },
                {
                    location_name: "Kozhikode",
                    type: "TEMP",
                    lat: 11.258753,
                    lon: 75.780411,
                },
                {
                    location_name: "Kannur",
                    type: "TEMP",
                    lat: 11.874477,
                    lon: 75.370369,
                },
                {
                    location_name: "Indiranagar",
                    type: "TEMP",
                    lat: 12.971891,
                    lon: 77.641151,
                },
                {
                    location_name: "Koramangala",
                    type: "TEMP",
                    lat: 12.934533,
                    lon: 77.626579,
                },
            ],
            username: "",
            email: "",
            password: "",
            selectedPlaces: [],
        };
    },
    methods: {
        redirectToLogin() {
            this.$router.push("/");
        },

        async getCurrentLocation() {
            return new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const latitude = position.coords.latitude;
                        const longitude = position.coords.longitude;

                        const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

                        fetch(url)
                            .then((response) => response.json())
                            .then((data) => {
                                const location = {
                                    location_name: data.display_name,
                                    type: "CURRENT",
                                    lat: latitude,
                                    lon: longitude,
                                };
                                resolve(location);
                            })
                            .catch((error) => {
                                console.error("Error fetching place name:", error);
                                reject(error);
                            });
                    },
                    (error) => {
                        console.error("Error getting location:", error);
                        reject(error);
                    }
                );
            });
        },
        async handleSubmit() {
            const { username, email, password } = this;
            const locations = this.selectedPlaces.map((place) => {
                return {
                    location_name: place.location_name,
                    type: place.type,
                    lat: place.lat,
                    lon: place.lon,
                };
            });
            locations.push(await this.getCurrentLocation());
            const payload = {
                username,
                email,
                password,
                locations,
            };
            try {
                const { data } = await this.$apollo.mutate({
                    mutation: SIGN_UP_MUTATION,
                    variables: {
                        input: payload,
                    },
                });
                if (data.signup.success) {
                    Swal.fire({
                        icon: "success",
                        title: "Sign Up Successful",
                        text: data.signup.message,
                        confirmButtonText: "OK",
                    }).then(() => {
                        this.redirectToLogin();
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Sign Up Failed",
                        text: data.signup.message,
                        confirmButtonText: "Try Again",
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Sign Up Failed",
                    text: error.message,
                    confirmButtonText: "Try Again",
                });
            }
        },
    },
};
</script>

<style scoped></style>

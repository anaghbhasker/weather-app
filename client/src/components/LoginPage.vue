<template>
  <div
    class="min-h-screen flex flex-col justify-center items-center bg-gray-100"
  >
    <div class="mb-6">
      <img
        src="../assets/7477790.png"
        alt="Placeholder Image"
        class="w-32 h-32 object-cover rounded-full"
      />
    </div>

    <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>

      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="email" class="block text-gray-700 text-sm font-bold mb-2"
            >Email</label
          >
          <input
            type="email"
            id="email"
            v-model="email"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>

        <div class="mb-6">
          <label
            for="password"
            class="block text-gray-700 text-sm font-bold mb-2"
            >Password</label
          >
          <input
            type="password"
            id="password"
            v-model="password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            required
          />
        </div>

        <div class="flex items-center justify-center">
          <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </div>
      </form>
      <div class="mt-4 text-center">
        <a
          href="#"
          class="text-blue-500 hover:text-blue-700"
          @click.prevent="redirectToSignup"
        >
          Not a member? Signup
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { LOGIN_MUTATION } from "@/server/graph";
import { getToken, messaging } from "../config/firebase";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  mounted() {
    this.requestNotificationPermission();
  },
  methods: {
    async requestNotificationPermission() {
      if (typeof window !== "undefined" && "serviceWorker" in navigator) {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
            // console.log("Permission granted");
          try {
            const FCMToken = await getToken(messaging, {
              vapidKey:
                "BOOY34bTMB4Cjg1h40d16JVCYTOHRvVTcqYA33k_xx2rywHzPst2Y_Dvbs_94TV3HBaW5sfleHNB952a5WkJ4Jg",
            });
            if (FCMToken) {
                // console.log("✌️FCMToken --->", FCMToken);
              return FCMToken;
            } else {
              console.log(
                "No registration token available. Request permission to generate one."
              );
            }
          } catch (error) {
            // console.log("✌️error --->", error);
            return "";
          }
        }
      }
    },
    async handleSubmit() {
      const { email, password } = this;
      const fcm_token = await this.requestNotificationPermission();
      const payload = {
        email,
        password,
        fcm_token,
      };
      try {
        const { data } = await this.$apollo.mutate({
          mutation: LOGIN_MUTATION,
          variables: {
            input: payload,
          },
        });
        if (data.login.success) {
          Swal.fire({
            icon: "success",
            title: "Login Successful",
            text: data.login.message,
            confirmButtonText: "OK",
          }).then(() => {
            localStorage.setItem("sqadra", data.login.user._id);
            this.$router.push("/home");
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Login Up Failed",
            text: data.login.message,
            confirmButtonText: "Try Again",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message,
          confirmButtonText: "Try Again",
        });
      }
    },
    redirectToSignup() {
      this.$router.push("/signup");
    },
  },
};
</script>

<style scoped></style>

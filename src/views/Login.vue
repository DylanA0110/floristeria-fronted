<template>
    <section class="bg-white min-h-screen flex items-center justify-center px-2">
        <div class="bg-white flex flex-col md:flex-row rounded-2xl shadow-lg max-w-3xl w-full p-5 items-center">
            <div class="md:w-1/2 px-8 md:px-16">
                <h2 class="font-bold text-2xl text-[#F29F05]">Iniciar sesión</h2>
                <p class="text-xs mt-4 text-[#D97C0B]">Ingresa tus credenciales</p>
                <form @submit.prevent="login" class="flex flex-col gap-4">
                    <input class="p-2 mt-8 rounded-xl border" type="email" v-model="email" placeholder="Correo electrónico" required />
                    <div class="relative">
    <input
        :type="showPassword ? 'text' : 'password'"
        class="p-2 rounded-xl border w-full"
        v-model="password"
        placeholder="Contraseña"
        required
    />
    <svg
        @click="showPassword = !showPassword"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="gray"
        class="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
        viewBox="0 0 16 16"
    >
        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
    </svg>
</div>
                    <button class="bg-[#F29F05] rounded-xl text-white py-2 hover:scale-105 duration-300" type="submit">
                        Entrar
                    </button>
                    <a href="#" class="text-xs text-[#F29F05] hover:underline text-right">¿Olvidaste tu contraseña?</a>
                    <p v-if="error" class="text-red-600 text-center">{{ error }}</p>
                </form>
            </div>
    <div class="hidden md:flex w-1/2 justify-center items-center">
    <img
    class="rounded-2xl w-full h-[500px] object-cover"
    :src="loginImg"
    alt="Login"
/>
</div>
        </div>
    </section>
</template>

<script>
import loginImg from '../assets/images/LoginDashboard.jpg'

export default {
    name: "Login",
    data() {
        return {
            email: "",
            password: "",
            error: "",
            showPassword: false,
            loginImg: loginImg,    
        };
    },
    methods: {
        login() {
            this.error = "";
            if (this.email === "admin@demo.com" && this.password === "12345") {
                this.$router.push({ name: "Home" });
            } else {
                this.error = "Correo o contraseña incorrectos.";
            }
        },
    },
};
</script>

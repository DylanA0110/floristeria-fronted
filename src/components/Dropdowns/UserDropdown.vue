<template>
  <div>
    <a
      class="text-blueGray-500 block"
      href="#pablo"
      ref="btnDropdownRef"
      v-on:click="toggleDropdown($event)"
    >
      <div class="items-center flex">
        <span
          class="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full"
        >
          <img
            alt="..."
            class="w-full rounded-full align-middle border-none shadow-lg"
            :src="image"
          />
        </span>
      </div>
    </a>
    <div
      ref="popoverDropdownRef"
      class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
      v-bind:class="{
        hidden: !dropdownPopoverShow,
        block: dropdownPopoverShow,
      }"
    >
      <a
        href="javascript:void(0);"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
      >
        Action
      </a>
      <a
        href="javascript:void(0);"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
      >
        Another action
      </a>
      <a
        href="javascript:void(0);"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
      >
        Something else here
      </a>
      <div class="h-0 my-2 border border-solid border-blueGray-100" />
      <a
        href="javascript:void(0);"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
      >
        Seprated link
      </a>
    </div>
  </div>
</template>

<script>
import { createPopper } from "@popperjs/core";
import userImage from '../../assets/images/user.png';

export default {
  data() {
    return {
      dropdownPopoverShow: false,
      image: userImage
    };
  },
  watch: {
    $route() {
      // Cierra el dropdown si se cambia de ruta
      this.dropdownPopoverShow = false;
    },
  },
  methods: {
    toggleDropdown(event) {
      event.preventDefault();

      // Invertir estado
      this.dropdownPopoverShow = !this.dropdownPopoverShow;

      // Crear popper solo si refs existen y está visible
      if (
        this.dropdownPopoverShow &&
        this.$refs.btnDropdownRef &&
        this.$refs.popoverDropdownRef
      ) {
        createPopper(
          this.$refs.btnDropdownRef,
          this.$refs.popoverDropdownRef,
          {
            placement: "bottom-start",
          }
        );
      }
    },
  },
};

</script>

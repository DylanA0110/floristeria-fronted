<template>
<header class="navbar bg-white dark:bg-[var(--color-backgroundDark)] dark:border-b dark:border-primary/10 sticky top-0 z-10 shadow-sm">
    <nav class="flex-non lg:hidden">
        <label @click="$emit('toggle-drawer')" class ="btn btn-square btn-ghost">
            <Icon icon = "line-md:close-to-menu-alt-transition" ckase ="inline-block w-5 h-5"></Icon>
        </label>
 </nav>
 <section class ="flex-1">
    <div class="form-control">
  <input
    type="text"
    placeholder="Search"
    class="input input-bordered w-48 ml-2 md:w-auto dark:bg-white/5 dark:backdrop-blur-md dark:[-webkit-backdrop-filter:blur(10px)] dark:border-white/10"
  />
</div>
 </section>
 <section class = 'flex gap-6'>
    <!--Theme toglle button-->
    <button @click=""></button>
 </section>
  </header>
</template>

<script setup>
defineEmits(['toggle-drawer'])
</script>

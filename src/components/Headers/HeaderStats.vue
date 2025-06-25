<script setup>
import { onMounted } from 'vue';
import { useEstadisticasStore } from '../../store/estadistica.js';
import CardStats from '../Cards/CardStats.vue';

const estadisticasStore = useEstadisticasStore();

onMounted(() => {
  estadisticasStore.fetchEstadisticas();
});
</script>

<template>
  <div class="relative bg-floristeria-darkGreen md:pt-32 pb-32 pt-12">
    <div class="px-4 md:px-10 mx-auto w-full">
      <div>
        <div class="flex flex-wrap">
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <card-stats
              statSubtitle="PEDIDOS TOTALES"
              :statTitle="estadisticasStore.totalPedidos"
              statIconName="fas fa-shopping-basket"
              statIconColor="bg-floristeria-gold"
            />
          </div>

          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <card-stats
              statSubtitle="PEDIDOS PENDIENTES"
              :statTitle="estadisticasStore.pedidosPendientes"
              statIconName="fas fa-hourglass-half"
              statIconColor="bg-floristeria-orangeAccent"
            />
          </div>

          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <card-stats
              statSubtitle="CLIENTES TOTALES"
              :statTitle="estadisticasStore.totalClientes"
              statIconName="fas fa-users"
              statIconColor="bg-floristeria-darkGreen"
            />
          </div>

          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <card-stats
              statSubtitle="EMPLEADOS TOTALES"
              :statTitle="estadisticasStore.totalEmpleados"
              statIconName="fas fa-user-tie"
              statIconColor="bg-floristeria-mediumGreen"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

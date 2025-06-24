<template>
  <div class="relative bg-floristeria-darkGreen md:pt-32 pb-32 pt-12">
    <div class="px-4 md:px-10 mx-auto w-full">
      <div>
        <div class="flex flex-wrap">
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <card-stats
              statSubtitle="PEDIDOS TOTALES"
              statTitle="1,234"
              statArrow="up"
              statPercent="15"
              statPercentColor="text-floristeria-mediumGreen"
              statDescripiron="Desde el mes pasado"
              statIconName="fas fa-shopping-basket"
              statIconColor="bg-floristeria-gold"
            />
          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <card-stats
              statSubtitle="PEDIDOS PENDIENTES"
              statTitle="85"
              statArrow="down"
              statPercent="2.5"
              statPercentColor="text-floristeria-orangePrimary"
              statDescripiron="Desde la semana pasada"
              statIconName="fas fa-hourglass-half"
              statIconColor="bg-floristeria-orangeAccent"
            />
          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <card-stats
              statSubtitle="INGRESOS (MES)"
              statTitle="$18,500"
              statArrow="up"
              statPercent="8.2"
              statPercentColor="text-floristeria-mediumGreen"
              statDescripiron="Desde el mes pasado"
              statIconName="fas fa-dollar-sign"
              statIconColor="bg-floristeria-darkGreen"
            />
          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <card-stats
              statSubtitle="FLORES EN STOCK"
              statTitle="5,678"
              statArrow="up"
              statPercent="5"
              statPercentColor="text-floristeria-mediumGreen"
              statDescripiron="Actualizado hoy"
              statIconName="fas fa-leaf"
              statIconColor="bg-floristeria-mediumGreen"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardStats from "@/components/Cards/CardStats.vue";

export default {
  components: {
    CardStats,
  },
};
</script>
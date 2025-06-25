<template>
  <div
    class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700"
  >
    <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full max-w-full flex-grow flex-1">
          <h6 class="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
            Resumen Financiero
          </h6>
          <h2 class="text-white text-xl font-semibold">
            Ingresos Mensuales
          </h2>
        </div>
      </div>
    </div>
    <div class="p-4 flex-auto">
      <!-- Loading state -->
      <div v-if="loading" class="text-center text-white py-8">
        Cargando datos...
      </div>
      
      <!-- Error state -->
      <div v-else-if="error" class="text-center text-red-300 py-8">
        {{ error }}
      </div>
      
      <!-- Chart -->
      <div v-else class="relative h-350-px">
        <canvas id="line-chart"></canvas>
      </div>
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";
import { getIngresoMensualActual, getIngresosPorMes } from "@/services/ingresosService";
Chart.register(...registerables);

export default {
  data() {
    return {
      loading: false,
      error: null,
      ingresosData: {
        currentYear: [],
        previousYear: []
      }
    };
  },
  async mounted() {
    await this.loadData();
    this.renderChart();
  },
  methods: {
    async loadData() {
      this.loading = true;
      this.error = null;
      
      try {
        const currentYear = new Date().getFullYear();
        const previousYear = currentYear - 1;
        
        // Obtener datos para el año actual y el anterior
        const [currentYearData, previousYearData] = await Promise.all([
          getIngresosPorMes(currentYear),
          getIngresosPorMes(previousYear)
        ]);
        
        // Procesar los datos para la gráfica
        this.ingresosData = {
          currentYear: this.prepareChartData(currentYearData),
          previousYear: this.prepareChartData(previousYearData)
        };
        
      } catch (error) {
        console.error('Error loading income data:', error);
        this.error = 'Error al cargar los datos de ingresos';
      } finally {
        this.loading = false;
      }
    },
    
    prepareChartData(monthlyData) {
      // Crear un array con 12 meses (0-11) y llenar con los datos
      const data = Array(12).fill(0);
      monthlyData.forEach(item => {
        data[item.Mes - 1] = item.IngresoTotal;
      });
      return data;
    },
    
    renderChart() {
      this.$nextTick(() => {
        const ctx = document.getElementById('line-chart').getContext('2d');
        
        const config = {
          type: "line",
          data: {
            labels: [
              "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
              "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
            ],
            datasets: [
              {
                label: new Date().getFullYear(),
                backgroundColor: "#4c51bf",
                borderColor: "#4c51bf",
                data: this.ingresosData.currentYear,
                fill: false,
                tension: 0.4
              },
              {
                label: new Date().getFullYear() - 1,
                backgroundColor: "#fff",
                borderColor: "#fff",
                data: this.ingresosData.previousYear,
                fill: false,
                tension: 0.4
              },
            ],
          },
          options: {
            maintainAspectRatio: false,
            responsive: true,
            plugins: {
              title: {
                display: false,
                text: "Ingresos Mensuales",
                color: "white",
              },
              legend: {
                labels: {
                  color: "white",
                },
                align: "end",
                position: "bottom",
              },
              tooltip: {
                mode: "index",
                intersect: false,
                callbacks: {
                  label: function(context) {
                    return `${context.dataset.label}: $${context.raw.toLocaleString()}`;
                  }
                }
              },
            },
            interaction: {
              mode: "nearest",
              intersect: true,
            },
            scales: {
              x: {
                ticks: {
                  color: "rgba(255,255,255,.7)",
                },
                grid: {
                  display: false,
                  color: "rgba(33, 37, 41, 0.3)",
                },
              },
              y: {
                ticks: {
                  color: "rgba(255,255,255,.7)",
                  callback: function(value) {
                    return `$${value.toLocaleString()}`;
                  }
                },
                grid: {
                  color: "rgba(255, 255, 255, 0.15)",
                },
              },
            },
          },
        };

        new Chart(ctx, config);
      });
    }
  }
};
</script>
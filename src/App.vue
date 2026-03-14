<template>
  <div class="page-bg">
    <div class="app-shell">
      <header class="hero">
        <div class="hero-badge">API pública · SITE MAP</div>
        <h1>Explorador de Países</h1>
        <p class="subtitle">
          Descubre países, filtra por región y consulta información básica con un diseño más moderno y limpio.
        </p>

        <div class="controls">
          <div class="input-group">
            <span class="input-icon">🔎</span>
            <input
              v-model="search"
              type="text"
              placeholder="Buscar país..."
              class="search"
            />
          </div>

          <select v-model="selectedRegion" class="region-select">
            <option value="Todos">Todas las regiones</option>
            <option v-for="region in regions" :key="region" :value="region">
              {{ region }}
            </option>
          </select>
        </div>

        <div class="top-info">
          <div class="info-pill">
            <span class="pill-label">Resultados</span>
            <strong>{{ filteredCountries.length }}</strong>
          </div>

          <div class="info-pill">
            <span class="pill-label">Región</span>
            <strong>{{ selectedRegion }}</strong>
          </div>
        </div>
      </header>

      <section class="status-section">
        <p v-if="loading" class="status-message">Cargando países...</p>
        <p v-if="error" class="status-message error">{{ error }}</p>
      </section>

      <section v-if="!loading && !error" class="countries-grid">
        <CountryCard
          v-for="country in filteredCountries"
          :key="country.cca3"
          :country="country"
        />
      </section>

      <p
        v-if="!loading && !error && filteredCountries.length === 0"
        class="status-message empty-message"
      >
        No se encontraron países con ese filtro.
      </p>
    </div>
  </div>
</template>

<script>
import CountryCard from './components/CountryCard.vue'

export default {
  components: {
    CountryCard
  },

  data() {
    return {
      countries: [],
      search: '',
      selectedRegion: 'Todos',
      loading: true,
      error: ''
    }
  },

  async mounted() {
    try {
      const res = await fetch(
        'https://restcountries.com/v3.1/all?fields=name,flags,capital,region,population,cca3'
      )

      if (!res.ok) {
        throw new Error('No se pudo cargar la información de la API.')
      }

      const data = await res.json()

      this.countries = data.sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
      )
    } catch (error) {
      console.error(error)
      this.error = 'Error al cargar los países desde la API.'
    } finally {
      this.loading = false
    }
  },

  computed: {
    regions() {
      return [...new Set(this.countries.map((country) => country.region))].filter(Boolean)
    },

    filteredCountries() {
      return this.countries.filter((country) => {
        const matchesSearch = country.name.common
          .toLowerCase()
          .includes(this.search.toLowerCase())

        const matchesRegion =
          this.selectedRegion === 'Todos' ||
          country.region === this.selectedRegion

        return matchesSearch && matchesRegion
      })
    }
  }
}
</script>
<template>
  <div class="page-bg">
    <div class="app-shell">
      <header class="hero">
        <span class="hero-badge">SITE MAP</span>
        <h1>Explorador de Países</h1>
        <p class="subtitle">
          Busca países, filtra por región, ordénalos y guarda tus favoritos.
        </p>

        <div class="controls">
          <input
            v-model="store.search"
            @input="store.savePreferences()"
            type="text"
            placeholder="Buscar país..."
            class="search"
          />

          <select v-model="store.selectedRegion" class="select" @change="store.savePreferences()">
            <option value="Todos">Todas las regiones</option>
            <option v-for="region in store.regions" :key="region" :value="region">
              {{ region }}
            </option>
          </select>

          <select v-model="store.sortOrder" class="select" @change="store.savePreferences()">
            <option value="asc">A - Z</option>
            <option value="desc">Z - A</option>
          </select>
        </div>

        <div class="extra-controls">
          <label class="favorites-toggle">
            <input
              type="checkbox"
              v-model="store.showOnlyFavorites"
              @change="store.savePreferences()"
            />
            <span>Solo favoritos</span>
          </label>

          <button class="clear-btn" @click="store.clearFilters()">
            Limpiar filtros
          </button>
        </div>

        <div class="top-info">
          <div class="info-pill">
            <span class="pill-label">Resultados</span>
            <strong>{{ store.filteredCountries.length }}</strong>
          </div>

          <div class="info-pill">
            <span class="pill-label">Favoritos</span>
            <strong>{{ store.favoritesCount }}</strong>
          </div>

          <div class="info-pill">
            <span class="pill-label">Orden</span>
            <strong>{{ store.sortOrder === 'asc' ? 'Ascendente' : 'Descendente' }}</strong>
          </div>

          <div class="info-pill">
            <span class="pill-label">Región activa</span>
            <strong>{{ store.selectedRegion }}</strong>
          </div>
        </div>
      </header>

      <section class="status-section">
        <p v-if="store.loading" class="status-message">Cargando países...</p>
        <p v-if="store.error" class="status-message error">{{ store.error }}</p>
      </section>

      <section
        v-if="!store.loading && !store.error && store.filteredCountries.length"
        class="countries-grid"
      >
        <CountryCard
          v-for="country in store.filteredCountries"
          :key="country.cca3"
          :country="country"
        />
      </section>

      <div
        v-if="!store.loading && !store.error && !store.filteredCountries.length"
        class="empty-state"
      >
        <h2>No encontramos países</h2>
        <p>
          Prueba cambiando la búsqueda, seleccionando otra región o desactivando el filtro de favoritos.
        </p>
        <button class="empty-btn" @click="store.clearFilters()">
          Ver todos los países
        </button>
      </div>

      <footer class="footer">
        <p>Explorador de Países · SM</p>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useCountryStore } from './stores/countryStore'
import CountryCard from './components/CountryCard.vue'

const store = useCountryStore()

onMounted(() => {
  store.loadPreferences()
  store.fetchCountries()
})
</script>
import { defineStore } from 'pinia'

export const useCountryStore = defineStore('countryStore', {
  state: () => ({
    countries: [],
    loading: false,
    error: '',
    search: '',
    selectedRegion: 'Todos',
    sortOrder: 'asc',
    showOnlyFavorites: false,
    favorites: JSON.parse(localStorage.getItem('favorites')) || [],
    preferences: JSON.parse(localStorage.getItem('preferences')) || {
      search: '',
      selectedRegion: 'Todos',
      sortOrder: 'asc',
      showOnlyFavorites: false
    }
  }),

  getters: {
    regions: (state) => {
      return [...new Set(state.countries.map((country) => country.region))].filter(Boolean)
    },

    filteredCountries: (state) => {
      let result = [...state.countries]

      if (state.search.trim()) {
        result = result.filter((country) =>
          country.name.common.toLowerCase().includes(state.search.toLowerCase())
        )
      }

      if (state.selectedRegion !== 'Todos') {
        result = result.filter((country) => country.region === state.selectedRegion)
      }

      if (state.showOnlyFavorites) {
        result = result.filter((country) => state.favorites.includes(country.cca3))
      }

      result.sort((a, b) => {
        const nameA = a.name.common.toLowerCase()
        const nameB = b.name.common.toLowerCase()

        return state.sortOrder === 'asc'
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA)
      })

      return result
    },

    favoritesCount: (state) => state.favorites.length
  },

  actions: {
    async fetchCountries() {
      this.loading = true
      this.error = ''

      try {
        const res = await fetch(
          'https://restcountries.com/v3.1/all?fields=name,flags,capital,region,subregion,population,cca3'
        )

        if (!res.ok) {
          throw new Error('No se pudo cargar la información de la API.')
        }

        const data = await res.json()
        this.countries = data
      } catch (error) {
        console.error(error)
        this.error = 'Error al cargar los países desde la API.'
      } finally {
        this.loading = false
      }
    },

    toggleFavorite(code) {
      const index = this.favorites.indexOf(code)

      if (index === -1) {
        this.favorites.push(code)
      } else {
        this.favorites.splice(index, 1)
      }

      localStorage.setItem('favorites', JSON.stringify(this.favorites))
    },

    isFavorite(code) {
      return this.favorites.includes(code)
    },

    savePreferences() {
      const prefs = {
        search: this.search,
        selectedRegion: this.selectedRegion,
        sortOrder: this.sortOrder,
        showOnlyFavorites: this.showOnlyFavorites
      }

      localStorage.setItem('preferences', JSON.stringify(prefs))
    },

    loadPreferences() {
      this.search = this.preferences.search || ''
      this.selectedRegion = this.preferences.selectedRegion || 'Todos'
      this.sortOrder = this.preferences.sortOrder || 'asc'
      this.showOnlyFavorites = this.preferences.showOnlyFavorites || false
    },

    clearFilters() {
      this.search = ''
      this.selectedRegion = 'Todos'
      this.sortOrder = 'asc'
      this.showOnlyFavorites = false
      this.savePreferences()
    }
  }
})
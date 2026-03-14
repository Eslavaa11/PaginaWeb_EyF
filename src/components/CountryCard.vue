<template>
  <article class="country-card">
    <div class="flag-wrap">
      <img
        :src="country.flags.png"
        :alt="country.name.common"
        class="country-flag"
      />
      <span class="region-badge">
        {{ country.region || 'Sin región' }}
      </span>
    </div>

    <div class="country-info">
      <h3>{{ country.name.common }}</h3>

      <div class="country-data">
        <p>
          <strong>Capital</strong>
          <span>{{ country.capital ? country.capital[0] : 'No disponible' }}</span>
        </p>

        <p>
          <strong>Población</strong>
          <span>{{ country.population.toLocaleString('es-CO') }}</span>
        </p>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    country: {
      type: Object,
      required: true
    }
  }
}
</script>
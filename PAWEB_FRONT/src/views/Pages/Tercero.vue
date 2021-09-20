<template>
  <div>
    <div class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center profile-header"
        style="min-height: 600px; background-image: url(img/theme/profile-cover.jpg); background-size: cover; background-position: center top;">
      <b-container fluid>
        <!-- Mask -->
        <span class="mask bg-gradient-success opacity-8"></span>
        <!-- Main container -->
        <b-container fluid class="mt--6">
          <br/><br/><br/>
            <tercero-form></tercero-form>
        </b-container>
      </b-container>
    </div>
  </div>
</template>
<script>
  import TerceroForm from './Terceros/TerceroForm.vue';

  export default {
    components: {
      TerceroForm
    }
  };
</script>
<style>
</style>

<template>
  <section class="container">
    <div class='widget'>
      <month></month>
      <days></days>
    </div>
  </section>
</template>
    
<script>
import Month from '../components/calendar/Month';
import Days from '../components/calendar/Days';

export default {
  name: 'widget',
  components: {
    month: Month,
    days: Days,
  },
};
</script>

<style>
.container {
  padding-bottom: 50px;
}
.widget {     
}
</style>
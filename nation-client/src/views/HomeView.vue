<script setup>

import {useAuthStore} from "../stores/auth";

const {isAuthenticated} = useAuthStore()
 </script>

<template>
  <main class="d-flex flex-column justify-content-center align-items-center m-3">
    <div >
      App Nation Interview Case Home Page
    </div>
    <div>
      Auth User: {{isAuthenticated}}
    </div>
  </main>
</template>

<script setup lang="ts">
    import { usePriceStore, appStore } from '@/stores/price';
    const store = usePriceStore(appStore)
</script>



<template>
        <div class="col-span-full " v-for="(size, index) in store.sizes" :key="index">
               <label :for="index" class="block text-sm/6 font-medium text-gray-900">
                     <span class="font-bold">  Precio Tamaño: </span> {{ size.size }}
                </label>
                <div class="mt-2">
                        <input 
                                :id="index"
                                :name="index"
                                :value="size.price > 0 ? size.price : ''"
                                type="number"
                                class="w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" 
                                placeholder="`Precio del tamaño ${size.size}`"
                        />
                </div>
        </div>
</template>

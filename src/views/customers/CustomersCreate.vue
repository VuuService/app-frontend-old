<template>
  <breadcrumb-view></breadcrumb-view>
  <form class="p-4">
    <div class="relative z-0 w-full mb-6 group">
      <input
        id="product_name"
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=""
        required
        type="text"
      />
      <label
        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 inline-flex items-center"
        for="product_name"
        >Vergi Kimlik Numarası<span class="text-xs pl-1 text-green-600"
          >(Zorunlu değil)</span
        ></label
      >
    </div>

    <div class="relative z-0 w-full mb-6 group">
      <input
        id="product_name"
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=""
        required
        type="text"
      />
      <label
        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        for="product_name"
        >Adı Soyadı</label
      >
    </div>
    <div class="relative z-0 w-full mb-6 group">
      <input
        id="product_name"
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=""
        required
        type="text"
      />
      <label
        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        for="product_name"
        >Telefon</label
      >
    </div>

    <div class="relative z-0 w-full mb-6 group">
      <input
        id="product_name"
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=""
        required
        type="text"
      />
      <label
        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        for="product_name"
        >Adres</label
      >
    </div>
    <div class="grid grid-cols-1 py-2">
      <button
        class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        type="button"
      >
        Konum
      </button>
    </div>
    <!-- //TODO  Burada konum butonuna tıklanınca openstreetmap adres bilgisi çekeceğiz. ayrıca geolocalation.coords -->
    <!-- //TODO input masklar yapılacak. quasara benzer bakıcaz buna -->
    <!-- //TODO  Burada sadece müşteri kaydetmek istene bilir. Eğer ki müşteriye cihaz satmak isteniyorsa ya da müşterinin cihazına direk bir bakım yapılacaksa kaydetin dışında butonlar koymalıyız. bu butonlar önce müşteriyi kaydedecek daha sonra ilgili ekrana atacak. Ekranları kaydırmalı düşünmüştüm. Ancak kullanıcının kafası karışa bilir. müşteri kayıt edildikten sonra ilgili ekranı route yaparak yönlendirmek en doğrusu hem müşterinin bilgileri gösterilir.

     -->
    <div class="grid grid-cols-2 gap-2 py-4">
      <button
        class="inline-flex items-center justify-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        type="button"
      >
        <i class="vuu-home"></i>
        <span> Satış İşlemleri </span>
      </button>
      <button
        class="inline-flex items-center justify-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        type="button"
      >
        <i class="vuu-home"></i>
        <span> Bakım İşlemleri </span>
      </button>
    </div>
    <button
      class="w-full text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      type="button"
    >
      Kaydet
    </button>
  </form>
</template>
<script lang="ts" setup>
import BreadcrumbView from '@/components/BreadcrumbView.vue'
</script>
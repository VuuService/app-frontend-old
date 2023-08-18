import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { CustomerInterface } from '@/api/CustomersApi'

export const customerStore = defineStore('customer', () => {
  const customer = ref<CustomerInterface>()
  const getCustomer = computed(() => customer.value)
  const setCustomer = (customerData: CustomerInterface) => {
    customer.value = customerData
    return true
  }

  return { getCustomer, setCustomer }
})

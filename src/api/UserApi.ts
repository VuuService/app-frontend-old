import { userStore } from '@/stores/AuthStore'

export interface UserInterface {
  firstName: string
  lastName: string
  email: string
  password: string
  role: string
  permissions: string[]
  token: {
    access_token: string
    refresh_token: string
  }
}

const { permissions } = userStore()

export function isGranted(permission: string) {
  return permissions.includes(permission)
}

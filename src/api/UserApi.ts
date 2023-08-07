import { userStore } from '@/stores/AuthStore'
import type { CompanyInterface } from '@/api/CompanyApi'

export interface UserInterface {
  firstName: string
  lastName: string
  email: string
  password: string
  role: string
  title: string
  permissions: string[]
  token: {
    access_token: string
    refresh_token: string
  }
  company: CompanyInterface
}

const { permissions, user } = userStore()

export function isGranted(permission: string) {
  return permissions.includes(permission)
}

export function isRole(role: string[]) {
  return role.includes(user.role)
}

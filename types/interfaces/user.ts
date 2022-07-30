import { Sex, UserRole } from "../enums/user"

export interface UserInterface {
    phone: string
    password: string
    email?: string
    name: string
    avatar?: string
    birthday?: Date
    sex?: Sex
    address?: string
    createdAt: Date,
    roles: UserRole[]
}

export interface Profile {
    phone: string
    email?: string
    name: string
    avatar?: string
    birthday?: Date
    sex?: Sex
    address?: string
    createdAt: Date,
    roles: UserRole[]
}
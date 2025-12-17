/// <reference types="astro/client" />

declare namespace App {
    interface Locals {
        user?: {
            id: number;
            name: string;
            role: string;
        }
    }
}
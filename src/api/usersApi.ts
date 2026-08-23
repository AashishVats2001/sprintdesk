import { apiClient } from "./client";

export interface DummyUser {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    image: string;
}


export async function getUsers(): Promise<DummyUser[]> {
    const response = await apiClient.get<{ users: DummyUser[] }>("/users");
    return response.data.users;
}
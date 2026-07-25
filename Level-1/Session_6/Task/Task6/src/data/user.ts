export interface user {
    id: number,
    userName: string,
    email: string,
    password: string,
    role: "user" | "admin"
}

export const users: user[] = [
    {
        id: 100,
        userName: "yass",
        email: "yass@gmail",
        password: "$2b$10$OPvm12RhYc6mrjnQMQkvOOwrnachLB3ClkHWUrDq8FEaJNRkaiX9u",
        role: "admin"
    },
    {
        id: 200,
        userName: "yousef",
        email: "yousef@gmail",
        password: "$2b$10$9OPfojaUKN5KWkYsNgUuUecKwSCrD3y3OML3TwW9mGMadT3POQkPK",
        role: "user"
    }
];




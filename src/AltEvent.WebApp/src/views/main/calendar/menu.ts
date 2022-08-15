export const Menu = [
    {
        name: "Календарь",
        link: "/calendar",
        icon: "bx-calendar",
    },
    // {
    //     name: "Сотрудники",
    //     link: "/employees",
    //     icon: "bx-user",
    // },
    {
        name: "Настройки",
        link: "#",
        icon: "bx-cog",
        children: [
            {
                name: "Профиль",
                link: "/settings/profile",
            },
            {
                name: "Компания",
                link: "/settings/company",
            },
        ],
    },
];

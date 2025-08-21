import {
    LuLayoutDashboard,
    LuHandCoins,
    LuWalletMinimal,
    LuLogOut,
    LuAlarmSmoke,
    LuActivity,
} from "react-icons/lu";

export const SIDE_MANU_DATA = [
    {
        id: "01",
        label: "Dashboard",
        icon: LuLayoutDashboard,
        path: "/dashboard",
    },
    {
        id: "02",
        label: "Income",
        icon: LuWalletMinimal,
        path: "/income",
    },
    {
        id: "03",
        label: "Expense",
        icon: LuHandCoins,
        path: "/expense",
    },

    {
        id: "04",
        label: "AI Suggestion",
        icon: LuActivity,
        path: "/aisuggestion",
    }, 


    {
        id: "06",
        label: "Logout",
        icon: LuLogOut,
        path: "logout",
    },
];
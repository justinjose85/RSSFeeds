import { DisplayFeeds } from "./components/DisplayFeeds";

const AppRoutes = [
    {
        index: true,
        //path: '/displayfeeds',
        element: <DisplayFeeds />
    },

    {
        path: '/displayfeeds',
        element: <DisplayFeeds />
    },

];

export default AppRoutes;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routesConfig } from "./RouterConfig";

const renderRoutes = (routes) =>
    routes.map(({ path, element, wrapper: Wrapper, children }, index) => {
        if (children) {
            return (
                <Route
                    key={index}
                    element={Wrapper ? <Wrapper /> : element}
                >
                    {renderRoutes(children)}
                </Route>
            );
        }

        return <Route key={index} path={path} element={element} />;
    });

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>{renderRoutes(routesConfig)}</Routes>
        </BrowserRouter>
    );
}

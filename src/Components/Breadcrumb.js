import { Link, useLocation } from "react-router-dom";

export default function Breadcrumbs() {
    const location = useLocation();
    let curentLink = "";

    const crumbs = location.pathname.split("/")
    .filter(crumb => crumb !== "")
    .map(crumb => {
        curentLink += `/${crumb}`

        return (
           <div className="crumb" key={crumb}>
            <Link to={curentLink}>{crumb}</Link>
           </div>
        )
    })

    return (
        <div className="breadcrumbs">{crumbs}</div>
    )
}
import { Link } from "react-router-dom"


const NotFoundPage = () => {

    return (
        <main className="wrapper mt-5">
            <p>Страница не найдена</p>
            <Link  to="/" >На главную</Link>

        </main>
    )
}
export default NotFoundPage
import CaruselHomePage from "../GeneralComponents/carousel/CaruselHomePage"

const HeroHomeComponents = () => {
    return (
        <section className="wrapper mt-5">
            <h2>Хранители Тайн</h2>
            <h6>Истории о храбрости и славе.</h6>
            <div>
                <CaruselHomePage branch="hero"/>
            </div>
        </section>
    )
}

export default HeroHomeComponents
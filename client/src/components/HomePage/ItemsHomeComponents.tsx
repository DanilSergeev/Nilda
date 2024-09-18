import CaruselHomePage from "../GeneralComponents/carousel/CaruselHomePage"


const ItemsHomeComponents = () => {
    return (
        <section className="wrapper mt-5 mb-5" >
            <h2>Тайны артефактов и их влияние</h2>
            <h6>Узнайте, какое могущество они несут</h6>
            <div>
                <CaruselHomePage branch="item"/>
            </div>
        </section>
    )
}

export default ItemsHomeComponents
// import AboutAnimeHomeComponents from "../components/HomePage/AboutAnimeHomeComponents"
// import AboutGamesHomeComponents from "../components/HomePage/AboutGamesHomeComponents"
// import AboutMangaHomeComponents from "../components/HomePage/AboutMangaHomeComponents"
import AboutUsHomeComponents from "../components/HomePage/AboutUsHomeComponents"
import ChatWithHeroHomeComponents from "../components/HomePage/ChatWithHeroHomeComponents"
import HeroHomeComponents from "../components/HomePage/HeroHomeComponents"
import ImageLineHomeComponents from "../components/HomePage/ImageLineHomeComponents"
import ItemsHomeComponents from "../components/HomePage/ItemsHomeComponents"
// import LocationHomeComponents from "../components/HomePage/LocationHomeComponents"
import WelcomeHomeComponents from "../components/HomePage/WelcomeHomeComponents"

const HomePage = () => {
    return (
        <main>
            <WelcomeHomeComponents/>
            <AboutUsHomeComponents/>
            <HeroHomeComponents/>
            <ImageLineHomeComponents/>
            <ChatWithHeroHomeComponents/>
            {/* <LocationHomeComponents/> */}
            <ItemsHomeComponents/>
            {/* <AboutMangaHomeComponents/>
            <AboutGamesHomeComponents/>
            <AboutAnimeHomeComponents/> */} 
        </main>
    )
}

export default HomePage
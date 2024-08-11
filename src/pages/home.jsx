import { Navigation } from "../components/common/navigation";
import { Header } from "../components/home/header";
import { Features } from "../components/home/features";
import { About } from "../components/home/about";
// import { Services } from "../components/services";
import { Gallery } from "../components/home/gallery";
import { Testimonials } from "../components/home/testimonials";
import { Team } from "../components/home/Team";
import { Survey } from "../components/home/survey";
import { Contact } from "../components/home/contact";
import SmoothScroll from "smooth-scroll";
import SurveyPopUp from "../components/popupmodal/surveyModal";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const Home = (props) => {
  return (
    <div>
      <Navigation />
      <SurveyPopUp data={props.data.Survey}/>
      <Header data={props.data.Header} />
      <Survey data={props.data.Survey}/>
      <Features data={props.data.Features} />
      <About data={props.data.About} />
      {/* <Services data={props.data.Services} /> */}
      <Gallery data={props.data.Gallery} />
      <Testimonials data={props.data.Testimonials} />
      <Team data={props.data.Team} />
      <Contact data={props.data.Contact} />
    </div>
  );
};

export default Home;

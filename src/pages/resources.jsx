import { Navigation } from "../components/common/navigation";
import { Header } from "../components/resources/header";
import { Cardcontainer } from "../components/resources/card-container";
import { Footer } from "../components/common/footer";

const Home = (props) => {
  return (
    <div>
      <Navigation />
      <Header data={props.data.Header} />
      <Cardcontainer data={props.data.Header}/>
      <Footer data={props.data.Contact} />
    </div>
  );
};

export default Home;

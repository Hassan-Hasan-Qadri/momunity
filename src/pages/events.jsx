import { Navigation } from "../components/common/navigation";
import { Header } from "../components/events/header";
import { Cardcontainer } from "../components/events/card-container";
import { Footer } from "../components/common/footer";

const Events = (props) => {
  return (
    <div>
      <Navigation />
      <Header data={props.data.Header} />
      <Cardcontainer data={props.data.Header}/>
      <Footer data={props.data.Contact} />
    </div>
  );
};

export default Events;

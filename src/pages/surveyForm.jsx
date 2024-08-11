import FormfacadeEmbed from "@formfacade/embed-react";
import { Navigation } from "../components/common/navigation";
import { Footer } from "../components/common/footer";
import { useParams } from "react-router-dom";
import JsonData from "../data/data.json";


const GoogleForm = (props) => {
    const { id } = useParams();
  return (
    <div>
      <Navigation />
      <div className="main-area">
        <FormfacadeEmbed
                formFacadeURL={JsonData?.Survey?.forms[id]?.url}
                onSubmitForm={() => {
                    localStorage.setItem('form-filled',true);
                    window.location.href = '/'
                }}
                />
        <Footer data={props.data.Contact} />
      </div>
    </div>
  );
};

export default GoogleForm;

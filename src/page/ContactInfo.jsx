import ContactForm from "../components/main/common/ContactForm"
import ContactDetails from "../components/main/contact/ContactDetails"

export const Contactinfo=()=>
{
    return (<div className="flex gap-2 flex-col-reverse md:flex-row w-11/12 mx-auto my-4 " >
        <ContactDetails/>
        <ContactForm/>
    </div>)
}
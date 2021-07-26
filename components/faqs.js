import SectionHeader from "./section.header";
import { faqs } from "../utils/constants";

function FAQs() {
  return (
    <div className="bg-secondary py-8">
      <div className="container mx-auto flex flex-col">
        <SectionHeader title="Frequently Asked Questions" />

        {/* faqs */}
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="flex flex-col space-y-1 my-4 cursor-pointer"
          >
            <h6 className="font-semibold">{faq.title}</h6>
            <p className="text-sm">{faq.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQs;

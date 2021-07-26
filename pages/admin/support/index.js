import AdminLayout from "../../../components/admin.layout";
import SectionHeader from "../../../components/section.header";
import { faqs } from "../../../utils/constants";

function AdminSupport() {
  return (
    <AdminLayout>
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
    </AdminLayout>
  );
}

export default AdminSupport;

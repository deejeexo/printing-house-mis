import React from "react";

function FAQSection() {
  return (
    <div>
      <div className="container my-24 px-6 mx-auto">
        <section className="mb-32 text-gray-800">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Frequently asked questions
          </h2>
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="mb-12">
              <p className="font-bold mb-4">
                What kind of printing services do you offer?
              </p>
              <p className="text-gray-500">
                Our printing house offers a wide range of printing services,
                including digital printing, offset printing, large format
                printing, custom printing, and more. We can print on a variety
                of materials, including paper, cardstock, vinyl, and more.
              </p>
            </div>

            <div className="mb-12">
              <p className="font-bold mb-4">
                Can you print custom sizes or designs?
              </p>
              <p className="text-gray-500">
                Yes, we can print custom sizes and designs. We have a team of
                graphic designers who can help you create a custom design, or
                you can provide your own design. We can also print on a variety
                of materials and in any size you need.
              </p>
            </div>

            <div className="mb-12">
              <p className="font-bold mb-4">
                How long does it take to receive my printed materials?
              </p>
              <p className="text-gray-500">
                The turnaround time for your printed materials will depend on
                the size and complexity of your project, as well as our current
                production schedule. On average, our turnaround time is 2-7
                business days. If you need your printed materials faster, we
                offer rush printing services.
              </p>
            </div>

            <div className="col-md-12 mb-12">
              <p className="font-bold mb-4">Do you offer shipping services?</p>
              <p className="text-gray-500">
                Yes, we offer shipping services to anywhere in the world. We use
                reliable shipping carriers to ensure that your printed materials
                arrive safely and on time. The shipping cost will depend on the
                size and weight of your shipment, as well as the shipping
                destination.
              </p>
            </div>

            <div className="mb-12">
              <p className="font-bold mb-4">What is your return policy?</p>
              <p className="text-gray-500">
                Our goal is to ensure that you are completely satisfied with
                your printed materials. If you are not satisfied with your
                order, please contact us within 7 days of receiving your
                shipment and we will work with you to resolve any issues. If a
                return is necessary, we will provide instructions on how to
                proceed.
              </p>
            </div>

            <div className="mb-12">
              <p className="font-bold mb-4">
                How can I place an order or get a quote?
              </p>
              <p className="text-gray-500">
                You can place an order or request a quote by contacting us
                directly, either by phone, email, or through our website. Our
                customer service team will be happy to assist you and answer any
                questions you may have.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default FAQSection;

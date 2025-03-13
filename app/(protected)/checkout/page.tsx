import FormAddress from "./_components/form-address";
import OrderInformation from "./_components/order-information";

const CheckoutPage = async () => {
  return (
    <section className='px-4 md:px-8 lg:px-12'>
      <div className='grid md:grid-cols-2 gap-8'>
        <FormAddress />
        <OrderInformation />
      </div>
    </section>
  );
};

export default CheckoutPage;

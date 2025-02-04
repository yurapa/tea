import { Metadata } from "next";
import { auth } from "@/auth";
import CheckoutSteps from "@/components/shared/checkout-steps";

export const metadata: Metadata = {
  title: "Payment Method",
};

const PaymentMethodPage = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error("User ID not found");
  }

  return (
    <>
      <CheckoutSteps current={2} />
      <div>Payment Method Form</div>
    </>
  );
};

export default PaymentMethodPage;

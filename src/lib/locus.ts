export async function createLocusPaymentIntent(amountUsd: number, orderId: string) {
  const mockMode = process.env.LOCUS_MOCK_MODE !== "false";
  if (mockMode) {
    return {
      provider: "LocusFounder",
      checkoutUrl: `/checkout/success?orderId=${orderId}`,
      paymentRef: `locus_mock_${orderId}_${amountUsd}`
    };
  }

  return {
    provider: "LocusFounder",
    checkoutUrl: `/checkout/success?orderId=${orderId}`,
    paymentRef: `locus_live_placeholder_${orderId}`
  };
}

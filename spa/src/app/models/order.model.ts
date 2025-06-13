export class Order {
  constructor(
    public orderId: number,
    public billingClientId: number,
    public deliveryClientId: number | null,
    public notes: string,
    public attachmentPath: string,
    public requestedDeliveryDate: string, // Utilisez string pour les dates en ISO format
    public requestedDeliveryTime: string, // Utilisez string pour les heures en ISO format
    public productId: number,
    public quantity: number
  ) {}
}

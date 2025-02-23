import { Euro, Headset, ShoppingBag, WalletCards } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { PRICE_FREE_SHIPPING_LIMIT } from "@/lib/constants";

const IconBoxes = () => {
  return (
    <div>
      <Card>
        <CardContent className="grid gap-4 md:grid-cols-4 p-4">
          <div className="space-y-2">
            <ShoppingBag />
            <div className="text-sm font-bold">Free Shipping</div>
            <div className="text-sm text-muted-foreground">
              Delivery all over Cyprus! Free shipping over &euro;
              {PRICE_FREE_SHIPPING_LIMIT}
            </div>
          </div>
          <div className="space-y-2">
            <Euro />
            <div className="text-sm font-bold">Money Back Guarantee</div>
            <div className="text-sm text-muted-foreground">
              Within 14 days for an exchange
            </div>
          </div>
          <div className="space-y-2">
            <WalletCards />
            <div className="text-sm font-bold">Flexible Payment</div>
            <div className="text-sm text-muted-foreground">
              Pay with credit card, PayPal or COD
            </div>
          </div>
          <div className="space-y-2">
            <Headset />
            <div className="text-sm font-bold">24/7 Support</div>
            <div className="text-sm text-muted-foreground">
              Get support at any time
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IconBoxes;

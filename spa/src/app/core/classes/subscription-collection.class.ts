import {Subscription} from 'rxjs';

export class SubscriptionCollection {
    private collection: Subscription[] = [];

    public set subscribe(subscription: Subscription) {
        this.collection.push(subscription);
    }

    public unsubscribe(): void {
        for (const subscription of this.collection) {
            subscription.unsubscribe();
        }
        this.collection = [];
    }
}

import { Injectable } from '@angular/core';

import { PubNubAngular } from "pubnub-angular2";

@Injectable()
export class PubnubService {

  private readonly PUBLISH_KEY = 'pub-c-1bb756c2-8269-4d1a-aeb2-d85d90d75bab';
  private readonly SUBSCRIBE_KEY = 'sub-c-47c33716-7f53-11e7-a0e0-ba359f928353';

  constructor(private pubNub: PubNubAngular) { }

  init() {
    this.pubNub.init({
      publishKey: this.PUBLISH_KEY,
      subscribeKey: this.SUBSCRIBE_KEY,
    });

    this.pubNub.addListener({
      presence: function (m) {
        console.log(m);
      },
      message: function (m) {
        console.log("Msg");
        console.log(m);
      }
    })
  }

  subscribe(channels: string[] = ['appointment']) {
    this.pubNub.subscribe({
      channels: channels,
      withPresence: true,
      triggerEvents: ['message', 'presence', 'status'],
    });
  }

  publish(message: any, channels: string[] = ['appointment']) {
    this.pubNub.publish({
      channel: channels,
      message: message,
      ttl: 10
    }, (status, response) => {
      if (status.error) {
        console.log(status);
      } else {
        console.log('message Published w/ timetoken', response.timetoken);
      }
    });
  }
}

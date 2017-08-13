import { Injectable } from '@angular/core';

import { PubNubAngular } from "pubnub-angular2";
import { AppointmentService } from "../../calendar/week/appointment/appointment.service";
import { LoggerService } from "../../core/logger.service";

@Injectable()
export class PubnubService {

  private readonly PUBLISH_KEY = 'pub-c-1bb756c2-8269-4d1a-aeb2-d85d90d75bab';
  private readonly SUBSCRIBE_KEY = 'sub-c-47c33716-7f53-11e7-a0e0-ba359f928353';

  constructor(private pubNub: PubNubAngular, private logger: LoggerService,
    private appointment: AppointmentService) { }

  private notify(m) {
    this.appointment.update(m);
  }

  init() {
    this.pubNub.init({
      publishKey: this.PUBLISH_KEY,
      subscribeKey: this.SUBSCRIBE_KEY,
    });

    this.pubNub.addListener({
      presence: (m) => {
        console.log(m);
      },
      message: (m) => {
        // console.log(m);
        this.notify(m);
      }
    })

  }

  subscribe(channels: string[] = ['appointment']) {
    this.pubNub.subscribe({
      channels: channels,
      withPresence: true,
      triggerEvents: ['message', 'presence', 'status']
    });
  }

  publish(message: any, channels: string[] = ['appointment']) {
    this.pubNub.publish({
      channel: channels,
      message: message,
      ttl: 10
    }, (status, response) => {
      let message, action;
      if (status.error) {
        this.logger.log(status);
        message = "Your appointment could not be set. Please Try again";
        action = "Okay";
      } else {
        this.logger.log(`message Published w/ timetoken ${response.timetoken}`);
        message = "Your appointment is created.";
        action = "Thanks";
        this.notify(message);
      }
      this.appointment.notifyUser(message, action);
    });
  }

  unSubscribe(all: boolean, channels: string[] = ['appointment']) {
    (all) ? this.pubNub.unsubscribeAll() : this.pubNub.unsubscribe({ channels: channels });
  }

}

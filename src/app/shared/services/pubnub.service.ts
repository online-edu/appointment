import { Injectable } from '@angular/core';

import { PubNubAngular } from "pubnub-angular2";
import { AppointmentService } from "../../calendar/week/appointment/appointment.service";
import { LoggerService } from "../../core/logger.service";
/**
 * Manage pub-sub requests using `PubNub`.
 *
 * `PubNub` is available as an injectable class, with methods to publish and subscribe messages/channels.
 * `PUBLISH_KEY` and `SUBSCRIBE_KEY` are required to intiate connection.
 */
@Injectable()
export class PubnubService {

  private readonly PUBLISH_KEY = 'pub-c-1bb756c2-8269-4d1a-aeb2-d85d90d75bab';
  private readonly SUBSCRIBE_KEY = 'sub-c-47c33716-7f53-11e7-a0e0-ba359f928353';

  constructor(private pubNub: PubNubAngular, private logger: LoggerService,
    private appointment: AppointmentService) { }
  /**
  * Notifies a subscriber when a new message is received.
  */
  private notify(m) {
    this.appointment.update(m);
  }
  /**
  * Initializes new PubNub connection and sets listeners.
  */
  init() {
    this.pubNub.init({
      publishKey: this.PUBLISH_KEY,
      subscribeKey: this.SUBSCRIBE_KEY,
    });

    this.pubNub.addListener({
      presence: (m) => this.logger.log(m),
      message: (m) => this.notify(m)
    })

  }
  /**
  * Channel subscriptions for active user.
  */
  subscribe(channels: string[] = ['appointment']) {
    this.pubNub.subscribe({
      channels: channels,
      withPresence: true,
      triggerEvents: ['message', 'presence', 'status']
    });
  }
  /**
  * Publishes a message to all subscribers.
  */
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
  /**
  * Unsubscription of active connection.
  */
  unSubscribe(all: boolean, channels: string[] = ['appointment']) {
    (all) ? this.pubNub.unsubscribeAll() : this.pubNub.unsubscribe({ channels: channels });
  }
}

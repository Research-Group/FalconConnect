import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MessagesService } from '../../services/messages.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-chat-feed',
  templateUrl: './chat-feed.component.html',
  styleUrls: ['./chat-feed.component.css']
})
export class ChatFeedComponent implements OnInit {
@ViewChild('scrollMe') private myScroller: ElementRef;
  constructor(private messagesService: MessagesService, private authService: AuthService) {}
  showChat: Boolean = false;
  messages = [];
  loadingSpinner: Boolean = false;
  MyId;
  MyAvatar;
  currentChatUser;
  ngOnInit() {
    this.messagesService.enteredChat.subscribe((value: any) => {
      this.showChat = value;
      this.getMessages();
      this.currentChatUser = this.messagesService.currentChatUser;
    });
    this.MyAvatar = this.authService.currentUserDetails().photoURL;
  }

getMessages() {
  this.loadingSpinner = true;
this.messagesService.getAllMessages().then((messagesObs: any) => {
  if (!messagesObs) {
    this.loadingSpinner = false;
    this.messages = [];
    console.log('nothing');

  } else {
    messagesObs.subscribe((messages) => {
      this.loadingSpinner = false;
      this.messages = messages;
      this.scrollDown();
    });
  }
});

}

scrollDown() {
  setTimeout(() => {
    this.myScroller.nativeElement.scrollTop = this.myScroller.nativeElement.scrollHeight;

  }, 1000);

}

chooseClass(msg) {
  this.MyId = this.authService.currentUserDetails().email;
  if (msg.sentby !== this.MyId) {
    return 'bubble client';
  } else {
    return 'bubble';
  }
}

}

import { Component, OnInit } from "@angular/core";
import { MessagesService } from "../../services/messages.service";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"]
})
export class FooterComponent implements OnInit {
  newMessage: string;

  faPaperPlane = faPaperPlane;

  constructor(private msgService: MessagesService) {}

  ngOnInit() {}
  addMessage() {
    if (this.newMessage !== "") {
      this.msgService.addNewMsg(this.newMessage);
    }
  }
}

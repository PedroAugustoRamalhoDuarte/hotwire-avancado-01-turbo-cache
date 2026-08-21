import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["time"];

  connect() {
    this.timer = setInterval(() => this.tick(), 1000);
  }

  disconnect() {
    clearInterval(this.timer);
  }

  tick() {
    this.timeTarget.textContent = new Date().toLocaleTimeString("pt-BR", { hour12: false });
  }
}

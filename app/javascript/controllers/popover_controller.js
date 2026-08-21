import { Controller } from "@hotwired/stimulus";
import { computePosition, flip, shift, offset, arrow } from "@floating-ui/dom";

export default class extends Controller {
  static targets = ["trigger", "content", "arrow"];
  static values = { placement: { type: String, default: "bottom-end" } };

  connect() {
    this.visible = false;
    this.hideOnOutsideClick = this.hideOnOutsideClick.bind(this);
    this.hideOnEscape = this.hideOnEscape.bind(this);
  }

  disconnect() {
    this.removeListeners();
  }

  toggle() {
    this.visible ? this.hide() : this.show();
  }

  show() {
    this.visible = true;
    this.contentTarget.classList.remove("hidden");
    this.triggerTarget.setAttribute("aria-expanded", "true");
    this.position();
    document.addEventListener("click", this.hideOnOutsideClick);
    document.addEventListener("keydown", this.hideOnEscape);
  }

  hide() {
    this.visible = false;
    this.contentTarget.classList.add("hidden");
    this.triggerTarget.setAttribute("aria-expanded", "false");
    this.removeListeners();
  }

  async position() {
    const middleware = [offset(8), flip(), shift({ padding: 8 })];

    if (this.hasArrowTarget) {
      middleware.push(arrow({ element: this.arrowTarget }));
    }

    const { x, y, placement, middlewareData } = await computePosition(
      this.triggerTarget,
      this.contentTarget,
      { placement: this.placementValue, middleware }
    );

    Object.assign(this.contentTarget.style, {
      left: `${x}px`,
      top: `${y}px`,
    });

    if (this.hasArrowTarget) {
      const { x: arrowX, y: arrowY } = middlewareData.arrow;

      const staticSide = {
        top: "bottom",
        right: "left",
        bottom: "top",
        left: "right",
      }[placement.split("-")[0]];

      Object.assign(this.arrowTarget.style, {
        left: arrowX != null ? `${arrowX}px` : "",
        top: arrowY != null ? `${arrowY}px` : "",
        [staticSide]: "-4px",
      });
    }
  }

  hideOnOutsideClick(event) {
    if (!this.element.contains(event.target)) this.hide();
  }

  hideOnEscape(event) {
    if (event.key === "Escape") this.hide();
  }

  removeListeners() {
    document.removeEventListener("click", this.hideOnOutsideClick);
    document.removeEventListener("keydown", this.hideOnEscape);
  }
}

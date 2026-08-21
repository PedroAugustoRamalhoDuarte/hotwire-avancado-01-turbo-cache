import { Controller } from "@hotwired/stimulus";
import { computePosition, flip, shift, offset, arrow } from "@floating-ui/dom";

export default class extends Controller {
  static targets = ["trigger", "content", "arrow"];
  static values = {
    placement: { type: String, default: "bottom-end" },
    dismissOutside: { type: Boolean, default: true },
  };

  connect() {
    this.visible = false;
    this.hideOnOutsideClick = this.hideOnOutsideClick.bind(this);
    this.hideOnEscape = this.hideOnEscape.bind(this);
    this.hideBeforeCache = this.hideBeforeCache.bind(this);
    document.addEventListener("turbo:before-cache", this.hideBeforeCache);
  }

  disconnect() {
    this.removeListeners();
    document.removeEventListener("turbo:before-cache", this.hideBeforeCache);
  }

  // Close the popover before Turbo snapshots the page, so the cached copy
  // is always in its default (closed) state.
  hideBeforeCache() {
    if (this.visible) this.hide();
  }

  toggle() {
    this.visible ? this.hide() : this.show();
  }

  show() {
    this.visible = true;
    this.contentTarget.classList.remove("hidden");
    this.triggerTarget.setAttribute("aria-expanded", "true");
    this.position();
    if (this.dismissOutsideValue) {
      document.addEventListener("click", this.hideOnOutsideClick);
    }
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

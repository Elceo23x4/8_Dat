// Simple event bus for cross-component communication without Redux
export const EventBus = {
    on(event, callback) {
        document.addEventListener(event, (e) => callback(e.detail));
    },
    emit(event, data) {
        document.dispatchEvent(new CustomEvent(event, { detail: data }));
    },
    off(event, callback) {
        document.removeEventListener(event, callback);
    }
};

// Events:
// - openAgro: Triggered from terminal to open agro modal
// - openContact: Triggered from telephone/warrior
// - waterPlants: Triggered from watering can

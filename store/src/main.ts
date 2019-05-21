import { ServiceLocator } from './service-locator';

document.addEventListener('DOMContentLoaded', () => {
    console.log('run preview window')
    const app = ServiceLocator.createApp();
    app.run();
});

window.addEventListener('click', (event) => {
    event.preventDefault();
});

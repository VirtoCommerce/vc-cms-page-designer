import { DesignerPreview } from './designer-preview';
import { HttpService } from './services/http.service';

document.addEventListener("DOMContentLoaded", () => {
    const view = document.getElementById("designer-preview");
    const designer = new DesignerPreview(new HttpService(), view);
    designer.run();
});

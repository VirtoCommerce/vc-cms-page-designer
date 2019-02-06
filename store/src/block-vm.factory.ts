import { HttpService } from './services/http.service';
import { BlockModel } from './models/block.model';
import { BlockViewModel } from './block.view-model';

export class BlocksViewModelFactory {

    constructor(private http: HttpService) { }

    getBlockViewModel(model: BlockModel): BlockViewModel {
        return new BlockViewModel(model, this.http);
    }
}
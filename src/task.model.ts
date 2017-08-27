import { UUID } from 'angular2-uuid';

export class Task {
    type = "item_add";
    temp_id: string;
    uuid: string;
    args: {
        content: string;
        project_id: number;
    }

    constructor(content:string, project_id:number) {
        this.temp_id = UUID.UUID();
        this.uuid = UUID.UUID();
        this.args = {
            content: content,
            project_id: project_id
        };
    }
}
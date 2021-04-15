import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";
import { EventManager } from "@angular/platform-browser";
import { merge, Observable } from "rxjs";
import { Node } from "src/app/shared/classes/node";

@Injectable({ providedIn: 'root' })
export class NodeService {

    plainNodes: Node[] = []

    constructor() {
        this.plainNodes.push(new Node('castori'))
        this.plainNodes.push(new Node('sono animali che mangiano legna', 1))
        this.plainNodes.push(new Node('costruiscono dighe', 1))
    }

    getPlainNodes() {
        return this.plainNodes;
    }

    getTree(): Node {
        const tree = new Node('root');
        tree.addChildren(this.plainNodes)
        return tree;
    }

    addNewNode(position?: number, lastNodeDepth: number = 0) {
        if (position == undefined) {
            position = this.plainNodes.length - 1;
        }
        this.plainNodes.splice(position, 0, new Node('', lastNodeDepth))
    }

    removeNode(index: number) {
        this.plainNodes.splice(index, 1)
    }


}
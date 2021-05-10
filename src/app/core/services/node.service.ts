import { DOCUMENT } from "@angular/common";
import { EventEmitter, Inject, Injectable } from "@angular/core";
import { EventManager } from "@angular/platform-browser";
import { BehaviorSubject, merge, Observable } from "rxjs";
import { Node } from "src/app/shared/classes/node";

@Injectable({ providedIn: 'root' })
export class NodeService {

    nodes: Node[] = []

    editingNodeIndex: BehaviorSubject<number>;
    
    constructor() {
        this.nodes.push(new Node('castori'))
        this.nodes.push(new Node('sono animali che mangiano legna', 1))
        this.nodes.push(new Node('costruiscono dighe', 1))

        // default node selection on 0
        this.editingNodeIndex = new BehaviorSubject<number>(0)
    }

    getNodes() {
        return this.nodes;
    }

    getTree(): Node {
        const tree = new Node('root');
        tree.addChildren(this.nodes)
        return tree;
    }

    changeEditingIndex(delta: number) {
        let newIndex = this.editingNodeIndex.value + delta;

        // index change conditions
        if (newIndex >= 0 && newIndex < this.nodes.length) {
            this.editingNodeIndex.next(newIndex)
        } 
    }

    // change the depth of the selected node
    changeEditingNodeDepth(delta: number) {
        // first root node has 0 depth always
        if (this.editingNodeIndex.value > 0) {
            let newDepth = this.nodes[this.editingNodeIndex.value].depth + delta;
            let prevItemDepth = this.nodes[this.editingNodeIndex.value - 1].depth;

            // depth cant go lower that 0 and higher that last element + 1
            // so every node has a direct parent 
            if (newDepth >= 0 && newDepth <= prevItemDepth + 1) {
                this.nodes[this.editingNodeIndex.value].depth += delta;
            }
        }
    }

    addNewNode() {
        let node: Node = this.nodes[this.editingNodeIndex.value];

        // confirm current node
        if (node.text == '') {
            return;
        }

        // move index on the next node
        this.editingNodeIndex.next(this.editingNodeIndex.value + 1);

        // add one more node after the current one at the same depth
        this.nodes.splice(this.editingNodeIndex.value, 0, new Node('', node.depth))
    }

    removeNode(index: number) {
        if(index == 0) {
            return
        }
        this.nodes.splice(index, 1)

        // set editing index on previous node
        this.editingNodeIndex.next(index - 1)
    }


}
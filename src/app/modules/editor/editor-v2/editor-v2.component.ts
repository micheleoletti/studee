import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { HotkeyService } from 'src/app/core/services/hotkey.service';
import { NodeService } from 'src/app/core/services/node.service';
import { Node } from 'src/app/shared/classes/node';

@Component({
  selector: 'app-editor-v2',
  templateUrl: './editor-v2.component.html',
  styleUrls: ['./editor-v2.component.scss']
})
export class EditorV2Component implements OnInit {

  nodes: Node[] = []
  root: Node = new Node('root');
  editingNodeIndex: number = 0;

  constructor(private hotkeyService: HotkeyService, private nodeService: NodeService) {

    // move seletion hotkeys
    hotkeyService.addShortcut({ command: 'nodeEditor.nodeUpdateSelectionUp', keys: 'ArrowUp' }).subscribe(
      (event) => { this.changeEditingNode(-1) }
    )
    hotkeyService.addShortcut({ command: 'nodeEditor.nodeUpdateSelectionDown', keys: 'ArrowDown' }).subscribe(
      (event) => { this.changeEditingNode(+1) }
    )

    // add/remove depth hotkeys
    hotkeyService.addShortcut({ command: 'nodeEditor.nodeAddDepth', keys: 'tab' }).subscribe(
      (event) => { this.changeEditingNodeDepth(+1) }
    )
    hotkeyService.addShortcut({ command: 'nodeEditor.nodeRemoveDepth', keys: 'shift.tab' }).subscribe(
      (event) => { this.changeEditingNodeDepth(-1) }
    )

    // special backspace events
    hotkeyService.addShortcut({ command: 'nodeEditor.nodeBackspace', keys: 'backspace', preventDefault: false }).subscribe(
      (event: KeyboardEvent) => {
        if (this.nodes[this.editingNodeIndex].text == '') {
          // prevent default only if current node is empty
          event.preventDefault();

          // remove depth 
          if (this.nodes[this.editingNodeIndex].depth > 0) {
            this.changeEditingNodeDepth(-1)
          }

          // if no depth left edit previous item
          else if (this.nodes[this.editingNodeIndex].depth == 0) {
            this.changeEditingNode(-1);
          }
        }
      }
    )

    // if node is empty, delete node
    hotkeyService.addShortcut({ command: 'nodeEditor.nodeBackspace', keys: 'control.backspace', preventDefault: false }).subscribe(
      (event: KeyboardEvent) => {
        if (this.nodes[this.editingNodeIndex].text == '') {
          // prevent default only if current node is empty
          event.preventDefault();

          // remove node
          this.nodeService.removeNode(this.editingNodeIndex);
          this.syncEditingIndex();
        }
      }
    )

    // save node
    hotkeyService.addShortcut({ command: 'nodeEditor.nodeSave', keys: 'enter' }).subscribe(
      (event) => {
        this.addNewNode();
      }
    )

    this.nodes = nodeService.getPlainNodes();
    // this.root = nodeService.getTree();
  }

  ngOnInit(): void {
    this.syncEditingIndex();
  }

  // change selected node for editing
  changeEditingNode(delta: number): void {
    let newIndex = this.editingNodeIndex + delta;

    if (newIndex >= 0 && newIndex < this.nodes.length) {
      this.editingNodeIndex = newIndex
    }
  }

  // change the depth of the selected node
  changeEditingNodeDepth(delta: number) {
    // first root node has 0 depth always
    if (this.editingNodeIndex > 0) {
      let newDepth = this.nodes[this.editingNodeIndex].depth + delta;
      let prevItemDepth = this.nodes[this.editingNodeIndex - 1].depth;

      // depth cant go lower that 0 and higher that last element + 1
      // so every node has a direct parent 
      if (newDepth >= 0 && newDepth <= prevItemDepth + 1) {
        this.nodes[this.editingNodeIndex].depth += delta;
      }
    }
  }

  // add new node
  addNewNode() {
    let editingNode = this.nodes[this.editingNodeIndex]

    // create new node only if current one is not empty
    if (editingNode.text != '') {

      // new node has same depth as last one
      this.nodeService.addNewNode(this.editingNodeIndex + 1, editingNode.depth);

      // update editing index
      this.syncEditingIndex(this.editingNodeIndex + 1);
    }
  }


  syncEditingIndex(index?: number) {
    if (this.nodes.length > 0) {
      if (index != undefined) {
        this.editingNodeIndex = index;
      } else {
        this.editingNodeIndex = this.nodes.length - 1;
      }
    }
  }

  array(num: number) {
    return Array(num);
  }

}

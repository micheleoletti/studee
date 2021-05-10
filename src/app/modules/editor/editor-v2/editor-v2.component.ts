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

    nodeService.editingNodeIndex.subscribe((index: number) => {
      this.editingNodeIndex = index;
    })

    // move seletion hotkeys
    hotkeyService.addShortcut({ command: 'nodeEditor.nodeUpdateSelectionUp', keys: 'ArrowUp' }).subscribe(
      (event) => { nodeService.changeEditingIndex(-1) }
    )
    hotkeyService.addShortcut({ command: 'nodeEditor.nodeUpdateSelectionDown', keys: 'ArrowDown' }).subscribe(
      (event) => { nodeService.changeEditingIndex(+1) }
    )

    // add/remove depth hotkeys
    hotkeyService.addShortcut({ command: 'nodeEditor.nodeAddDepth', keys: 'tab' }).subscribe(
      (event) => { nodeService.changeEditingNodeDepth(+1) }
    )
    hotkeyService.addShortcut({ command: 'nodeEditor.nodeRemoveDepth', keys: 'shift.tab' }).subscribe(
      (event) => { nodeService.changeEditingNodeDepth(-1) }
    )

    // special backspace events
    hotkeyService.addShortcut({ command: 'nodeEditor.nodeBackspace', keys: 'backspace', preventDefault: false }).subscribe(
      (event: KeyboardEvent) => {
        if (this.nodes[this.editingNodeIndex].text == '') {
          // prevent default only if current node is empty
          event.preventDefault();

          // remove depth 
          if (this.nodes[this.editingNodeIndex].depth > 0) {
            nodeService.changeEditingNodeDepth(-1)
          }

          // if no depth left edit previous item
          else if (this.nodes[this.editingNodeIndex].depth == 0) {
            nodeService.changeEditingIndex(-1);
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
        }
      }
    )

    // save node
    hotkeyService.addShortcut({ command: 'nodeEditor.nodeSave', keys: 'enter' }).subscribe(
      (event) => {
        nodeService.addNewNode();
      }
    )

    this.nodes = nodeService.getNodes();
    // this.root = nodeService.getTree();
  }

  ngOnInit(): void {
  }

  array(num: number) {
    return Array(num);
  }

}

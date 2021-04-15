export class Node {
  
    public children: Node[];
    public depth: number;
    public text: string;
    public complete: boolean;
  
    constructor(line: string, depth: number = 0, complete: boolean = true) {
      this.children = []
      this.depth = depth
      this.text = line.trim()
      this.complete = complete;
    }
  
    addChildren(nodes: Node[]){
      this.children = []
      // imposta livello root corrente
      var childLevel = nodes[0].depth
  
      while(nodes.length > 0) {
        // prende il primo nodo e lo rimuove dalla lista
        var node = nodes.shift()!
  
        // stesso livello, aggiunge nodo alla lista dei figli del nodo corrente
        if(node.depth == childLevel) {
          this.children.push(node)
        }
  
        // livello maggiore, il nodo e' un nipote
        else if (node.depth > childLevel){
          // revert del pop iniziale
          nodes.splice(0, 0, node)
  
          // richiama la generazione ricorsiva dei nodi partendo dall ultimo figlio nella lista
          // quando viene passado un oggetto, nodes in questo caso, come parametro, 
          // i suoi valori vengono modificati in-place, il che spiega l'insert prima prima del
          // return vuoto nell ultimo IF
          this.children[this.children.length - 1].addChildren(nodes)
        }
  
        // livello inferiore, niente piu figli
        else if(node.depth <= this.depth) {
          nodes.splice(0, 0, node)
          return
        }
        
      }
  
    }
  }
  
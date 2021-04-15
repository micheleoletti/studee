import { DOCUMENT } from "@angular/common";
import { importExpr } from "@angular/compiler/src/output/output_ast";
import { Inject, Injectable } from "@angular/core";
import { EventManager } from "@angular/platform-browser";
import { merge, Observable } from "rxjs";

interface Hotkey {
  command: string;
  element?: any;
  keys: string;
  preventDefault?: boolean;
}

@Injectable({ providedIn: 'root' })
export class HotkeyService {

  // imposta l'elemento di default sul quale registrare il listener
  defaults: Partial<Hotkey> = {
    element: this.document,
    preventDefault: true
  }


  constructor(private eventManager: EventManager,
    // ottiene document per impostarlo come elemento default
    @Inject(DOCUMENT) private document: Document) {
  }

  addShortcut(hotkey: Hotkey) {
    let merged = { ...this.defaults, ...hotkey } as Hotkey
    let event = `keydown.${hotkey.keys}`;

    const shortcut = new Observable<KeyboardEvent>(observer => {

      // crea l'handler che viene richiamato ogni volta che l'hotkey viene premuto
      const handler = (e: KeyboardEvent) => {
        if (merged.preventDefault == true) {
          e.preventDefault()
        }

        observer.next(e);
      };

      // crea listener, salvando in dispose il metodo per rimuovere il listerer
      const dispose = this.eventManager.addEventListener(
        merged.element, event, handler
      );

      // restituisce il corpo della funzione di unsubscribe, che richiama
      // il metodo che rimuove il listener
      return () => {
        dispose();
      };
    })

    return shortcut
  }

  // TODO: gestire rimozione hotkeys
  removeShortcut(command: string) {
  }

}